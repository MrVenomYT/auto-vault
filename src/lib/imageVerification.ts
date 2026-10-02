/**
 * ADVANCED DETERMINISTIC VEHICLE IMAGE VERIFICATION & SCORING ENGINE
 * 
 * Implements strict, production-grade real-image retrieval and validation pipeline.
 * Rules:
 * 1. Vehicle Identity Normalization
 * 2. Image Source Hierarchy (Tiers 1 to 4)
 * 3. Exact Match Requirement & Hard Gates
 * 4. Image Authenticity Filter (REAL_PHOTO only)
 * 5. Visual Vehicle Validation
 * 6. Metadata Validation
 * 7. Concrete 100-Point Match Scoring Formula
 * 8. Strict Year and Generation Handling
 * 9. Hard Gates and Confidence Classification
 * 10. Fallback Hierarchy (Exact -> Representative -> Image Unavailable; NO AI fallback)
 */

export type PhotoAuthenticityType = 
  | "REAL_PHOTO" 
  | "AI_GENERATED" 
  | "CGI_RENDER" 
  | "3D_RENDER" 
  | "ILLUSTRATION" 
  | "CARTOON" 
  | "CONCEPT_ART" 
  | "HEAVILY_MANIPULATED" 
  | "UNKNOWN"

export type SourceReliabilityTier = 
  | "manufacturer" 
  | "authorized_dealer" 
  | "established_automotive" 
  | "verified_inventory" 
  | "unverified" 
  | "suspicious"

export type VerificationConfidenceStatus = 
  | "VERIFIED_EXACT"          // 90-100 pts
  | "VERIFIED_REPRESENTATIVE" // 80-89 pts with verified identity + generation
  | "REVIEW_REQUIRED"         // 70-79 pts
  | "REJECTED"                // < 70 pts or Hard Gate failure

export interface NormalizedVehicleIdentity {
  make: string
  model: string
  year: number
  generation?: string
  facelift?: boolean
  trim?: string
  bodyStyle: string
  marketRegion?: string
  color?: string
}

export interface ImageCandidate {
  url: string
  sourceUrl?: string
  sourceTier: SourceReliabilityTier
  photoAuthenticity: PhotoAuthenticityType
  caption?: string
  metaTitle?: string
  candidateMake?: string
  candidateModel?: string
  candidateYear?: number
  candidateGeneration?: string
  candidateBodyStyle?: string
  candidateTrim?: string
  visualChecks?: {
    frontFascia: number // 0 to 2
    grilleBumper: number // 0 to 2
    bodyProfile: number // 0 to 2
    taillightsRear: number // 0 to 2
    otherDetails: number // 0 to 2
  }
  imageQualityScore?: number // 0 to 5
}

export interface ScoreBreakdown {
  identityScore: number // max 25
  generationScore: number // max 20
  yearScore: number // max 15
  bodyStyleScore: number // max 10
  trimScore: number // max 5
  visualScore: number // max 10
  sourceScore: number // max 5
  photoAuthenticityScore: number // max 5
  imageQualityScore: number // max 5
}

export interface VerificationResult {
  vehicle: string
  matchScore: number
  status: VerificationConfidenceStatus
  isAcceptable: boolean
  isRepresentative: boolean
  hardGatePassed: boolean
  rejectionReasons: string[]
  makeMatch: boolean
  modelMatch: boolean
  generationMatch: boolean
  yearMatch: boolean
  bodyStyleMatch: boolean
  photoAuthenticity: PhotoAuthenticityType
  sourceReliability: SourceReliabilityTier
  breakdown: ScoreBreakdown
  verifiedAt: string
}

/**
 * 1. Normalize Vehicle Identity
 */
export function normalizeVehicleIdentity(raw: {
  make: string
  model: string
  year: number
  generation?: string
  trim?: string
  bodyStyle?: string
  category?: string
}): NormalizedVehicleIdentity {
  const makeClean = raw.make.trim()
  let modelClean = raw.model.trim()
  
  // Clean up common make duplicates in model string
  if (modelClean.toLowerCase().startsWith(makeClean.toLowerCase())) {
    modelClean = modelClean.substring(makeClean.length).trim()
  }

  const bodyStyleClean = raw.bodyStyle?.trim() || raw.category?.trim() || "Coupe"

  return {
    make: makeClean,
    model: modelClean,
    year: Number(raw.year),
    generation: raw.generation?.trim(),
    trim: raw.trim?.trim(),
    bodyStyle: bodyStyleClean
  }
}

/**
 * Normalizes strings for robust case/punctuation invariant comparison
 */
function normStr(str?: string): string {
  if (!str) return ""
  return str.toLowerCase().replace(/[^a-z0-9]/g, "")
}

/**
 * Checks body style compatibility
 */
function evaluateBodyStyle(expected: string, candidate?: string): { score: number; match: boolean; reject: boolean } {
  if (!candidate) return { score: 5, match: true, reject: false }
  
  const exp = normStr(expected)
  const cand = normStr(candidate)

  if (exp === cand || cand.includes(exp) || exp.includes(cand)) {
    return { score: 10, match: true, reject: false }
  }

  // Compatible body styles
  const isCoupeSports = (exp.includes("coupe") || exp.includes("supercar") || exp.includes("sports")) && 
                        (cand.includes("coupe") || cand.includes("supercar") || cand.includes("sports"))
  const isHistoric = (exp.includes("classic") || exp.includes("vintage") || exp.includes("historic")) &&
                     (cand.includes("classic") || cand.includes("vintage") || cand.includes("historic"))

  if (isCoupeSports || isHistoric) {
    return { score: 5, match: true, reject: false }
  }

  // Incompatible hard rejections (e.g. Sedan != Hatchback, SUV != Sedan, Convertible != Coupe)
  return { score: 0, match: false, reject: true }
}

/**
 * Evaluates candidate image using the concrete 100-point scoring formula and hard gates
 */
export function verifyCandidateImage(
  target: NormalizedVehicleIdentity,
  candidate: ImageCandidate
): VerificationResult {
  const rejectionReasons: string[] = []
  let hardGatePassed = true

  const expectedMakeNorm = normStr(target.make)
  const expectedModelNorm = normStr(target.model)
  const candMakeNorm = normStr(candidate.candidateMake || target.make)
  const candModelNorm = normStr(candidate.candidateModel || target.model)

  // --- HARD GATE 1: Photo Authenticity ---
  if (candidate.photoAuthenticity !== "REAL_PHOTO") {
    hardGatePassed = false
    rejectionReasons.push(`Photo authenticity failed: ${candidate.photoAuthenticity}. Only REAL_PHOTO is accepted.`)
  }

  // --- HARD GATE 2: Source Reliability ---
  if (candidate.sourceTier === "suspicious") {
    hardGatePassed = false
    rejectionReasons.push("Suspicious or untrusted image source rejected.")
  }

  // --- HARD GATE 3: Vehicle Make & Model ---
  const makeMatch = expectedMakeNorm.length > 0 && (candMakeNorm.includes(expectedMakeNorm) || expectedMakeNorm.includes(candMakeNorm))
  const modelMatch = expectedModelNorm.length > 0 && (candModelNorm.includes(expectedModelNorm) || expectedModelNorm.includes(candModelNorm))

  if (!makeMatch) {
    hardGatePassed = false
    rejectionReasons.push(`Make mismatch: expected ${target.make}, received ${candidate.candidateMake || "unknown"}`)
  }
  if (!modelMatch) {
    hardGatePassed = false
    rejectionReasons.push(`Model mismatch: expected ${target.model}, received ${candidate.candidateModel || "unknown"}`)
  }

  // --- A. Vehicle Identity Score (Max 25) ---
  let identityScore = 0
  if (makeMatch) identityScore += 10
  if (modelMatch) identityScore += 15

  // --- B. Generation Score (Max 20) ---
  let generationScore = 5
  let generationMatch = true
  if (target.generation && candidate.candidateGeneration) {
    const targetGenNorm = normStr(target.generation)
    const candGenNorm = normStr(candidate.candidateGeneration)
    if (targetGenNorm === candGenNorm || candGenNorm.includes(targetGenNorm) || targetGenNorm.includes(candGenNorm)) {
      generationScore = 20
      generationMatch = true
    } else {
      generationScore = 0
      generationMatch = false
      hardGatePassed = false
      rejectionReasons.push(`Generation mismatch: expected ${target.generation}, received ${candidate.candidateGeneration}`)
    }
  } else if (target.generation && !candidate.candidateGeneration) {
    generationScore = 12 // Strongly inferred from model and year
  }

  // --- C. Model Year Score (Max 15) ---
  let yearScore = 5
  let yearMatch = false
  if (candidate.candidateYear && candidate.candidateYear === target.year) {
    yearScore = 15
    yearMatch = true
  } else if (candidate.candidateYear && Math.abs(candidate.candidateYear - target.year) <= 3 && generationMatch) {
    yearScore = 10
    yearMatch = false // same generation representative
  } else if (!candidate.candidateYear) {
    yearScore = 5
    yearMatch = true
  } else if (!generationMatch) {
    yearScore = 0
    yearMatch = false
  }

  // --- D. Body Style Score (Max 10) ---
  const bodyEval = evaluateBodyStyle(target.bodyStyle, candidate.candidateBodyStyle)
  const bodyStyleScore = bodyEval.score
  const bodyStyleMatch = bodyEval.match
  if (bodyEval.reject) {
    hardGatePassed = false
    rejectionReasons.push(`Body style mismatch: expected ${target.bodyStyle}, received ${candidate.candidateBodyStyle}`)
  }

  // --- E. Trim Score (Max 5) ---
  let trimScore = 3
  if (target.trim && candidate.candidateTrim) {
    const tNorm = normStr(target.trim)
    const cNorm = normStr(candidate.candidateTrim)
    if (tNorm === cNorm || cNorm.includes(tNorm) || tNorm.includes(cNorm)) {
      trimScore = 5
    } else {
      trimScore = 0
    }
  }

  // --- F. Visual Vehicle Verification Score (Max 10) ---
  let visualScore = 10
  if (candidate.visualChecks) {
    visualScore = Math.min(10, 
      (candidate.visualChecks.frontFascia || 2) +
      (candidate.visualChecks.grilleBumper || 2) +
      (candidate.visualChecks.bodyProfile || 2) +
      (candidate.visualChecks.taillightsRear || 2) +
      (candidate.visualChecks.otherDetails || 2)
    )
  }

  // --- G. Source Reliability Score (Max 5) ---
  let sourceScore = 0
  switch (candidate.sourceTier) {
    case "manufacturer":
      sourceScore = 5
      break
    case "authorized_dealer":
      sourceScore = 4
      break
    case "established_automotive":
      sourceScore = 3
      break
    case "verified_inventory":
      sourceScore = 2
      break
    case "unverified":
    default:
      sourceScore = 0
      break
  }

  // --- H. Photo Authenticity Score (Max 5) ---
  let photoAuthenticityScore = 0
  if (candidate.photoAuthenticity === "REAL_PHOTO") {
    photoAuthenticityScore = 5
  }

  // --- I. Image Quality Score (Max 5) ---
  const imageQualityScore = Math.min(5, Math.max(0, candidate.imageQualityScore !== undefined ? candidate.imageQualityScore : 5))
  if (imageQualityScore === 0) {
    hardGatePassed = false
    rejectionReasons.push("Broken or unreadable image file.")
  }

  // --- Calculate Total MATCH_SCORE ---
  const matchScore = Math.min(100, Math.max(0,
    identityScore +
    generationScore +
    yearScore +
    bodyStyleScore +
    trimScore +
    visualScore +
    sourceScore +
    photoAuthenticityScore +
    imageQualityScore
  ))

  // --- Determine Status based on Mandatory Acceptance Thresholds ---
  let status: VerificationConfidenceStatus = "REJECTED"
  let isAcceptable = false
  let isRepresentative = false

  if (hardGatePassed) {
    if (matchScore >= 90) {
      status = "VERIFIED_EXACT"
      isAcceptable = true
      isRepresentative = false
    } else if (matchScore >= 80 && makeMatch && modelMatch && generationMatch) {
      status = "VERIFIED_REPRESENTATIVE"
      isAcceptable = true
      isRepresentative = true
    } else if (matchScore >= 70) {
      status = "REVIEW_REQUIRED"
      isAcceptable = false
    } else {
      status = "REJECTED"
      isAcceptable = false
    }
  } else {
    status = "REJECTED"
    isAcceptable = false
  }

  return {
    vehicle: `${target.year} ${target.make} ${target.model} ${target.bodyStyle}`.trim(),
    matchScore,
    status,
    isAcceptable,
    isRepresentative,
    hardGatePassed,
    rejectionReasons,
    makeMatch,
    modelMatch,
    generationMatch,
    yearMatch,
    bodyStyleMatch,
    photoAuthenticity: candidate.photoAuthenticity,
    sourceReliability: candidate.sourceTier,
    breakdown: {
      identityScore,
      generationScore,
      yearScore,
      bodyStyleScore,
      trimScore,
      visualScore,
      sourceScore,
      photoAuthenticityScore,
      imageQualityScore
    },
    verifiedAt: new Date().toISOString()
  }
}

/**
 * 21. Candidate Ranking Algorithm
 * Sorts multiple candidate images according to strict deterministic priority
 */
export function rankCandidateImages(
  target: NormalizedVehicleIdentity,
  candidates: ImageCandidate[]
): { candidate: ImageCandidate; result: VerificationResult }[] {
  const evaluated = candidates.map(cand => ({
    candidate: cand,
    result: verifyCandidateImage(target, cand)
  }))

  return evaluated.sort((a, b) => {
    // 1. Hard-gate validity first
    if (a.result.hardGatePassed !== b.result.hardGatePassed) {
      return a.result.hardGatePassed ? -1 : 1
    }
    // 2. MATCH_SCORE descending
    if (b.result.matchScore !== a.result.matchScore) {
      return b.result.matchScore - a.result.matchScore
    }
    // 3. Exact generation match
    if (a.result.generationMatch !== b.result.generationMatch) {
      return a.result.generationMatch ? -1 : 1
    }
    // 4. Exact year match
    if (a.result.yearMatch !== b.result.yearMatch) {
      return a.result.yearMatch ? -1 : 1
    }
    // 5. Source reliability
    if (b.result.breakdown.sourceScore !== a.result.breakdown.sourceScore) {
      return b.result.breakdown.sourceScore - a.result.breakdown.sourceScore
    }
    // 6. Image quality score
    return b.result.breakdown.imageQualityScore - a.result.breakdown.imageQualityScore
  })
}

/**
 * In-memory verification cache to prevent redundant validations
 */
const verificationCache = new Map<string, VerificationResult>()

export function getCachedVerification(cacheKey: string): VerificationResult | undefined {
  return verificationCache.get(cacheKey)
}

export function setCachedVerification(cacheKey: string, result: VerificationResult): void {
  verificationCache.set(cacheKey, result)
}
