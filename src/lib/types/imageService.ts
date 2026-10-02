export type BodyStyle =
  | "sedan"
  | "suv"
  | "coupe"
  | "hatchback"
  | "convertible"
  | "wagon"
  | "pickup"
  | "van"
  | "mpv"
  | "minivan"
  | "other"

export type CandidateLifecycleState =
  | "DISCOVERED"
  | "FETCHING"
  | "FETCHED"
  | "DECODING"
  | "ANALYZING"
  | "VALIDATING"
  | "ACCEPTED"
  | "REJECTED"
  | "QUARANTINED"
  | "EXPIRED"

export type VerificationDecision =
  | "VERIFIED"
  | "REPRESENTATIVE"
  | "UNAVAILABLE"
  | "PENDING_REVIEW"

export type ImageStatus =
  | "SEARCHING"
  | "VALIDATING"
  | "VERIFIED"
  | "REPRESENTATIVE"
  | "UNAVAILABLE"
  | "INVALID"
  | "BROKEN"

export type ImageType =
  | "REAL_PHOTO"
  | "AI_GENERATED"
  | "CGI_RENDER"
  | "3D_RENDER"
  | "ILLUSTRATION"
  | "CARTOON"
  | "CONCEPT_ART"
  | "HEAVILY_MANIPULATED"
  | "UNKNOWN"

export type SourceType =
  | "MANUFACTURER"
  | "AUTHORIZED_DEALER"
  | "AUTOMOTIVE_PUBLICATION"
  | "VERIFIED_INVENTORY"
  | "OTHER"

export type MatchResult =
  | "MATCH"
  | "MISMATCH"
  | "UNKNOWN"
  | "NOT_APPLICABLE"

export type FailureSeverity =
  | "FATAL"
  | "BLOCKING"
  | "DEGRADED"
  | "WARNING"
  | "INFORMATIONAL"

export type AuthenticityDecision =
  | "AUTHENTIC_PHOTO"
  | "SYNTHETIC"
  | "RENDERED"
  | "MANIPULATED"
  | "UNCERTAIN"
  | "UNSUPPORTED"

export type TechnicalFailure =
  | "DNS_FAILURE"
  | "TLS_FAILURE"
  | "HTTP_TIMEOUT"
  | "HTTP_4XX"
  | "HTTP_5XX"
  | "REDIRECT_LIMIT_EXCEEDED"
  | "UNSAFE_REDIRECT"
  | "PRIVATE_IP_TARGET"
  | "INVALID_CONTENT_TYPE"
  | "MAGIC_BYTES_MISMATCH"
  | "DECODE_FAILURE"
  | "CORRUPTED_FILE"
  | "PAYLOAD_TOO_LARGE"
  | "DIMENSIONS_TOO_SMALL"
  | "UNSUPPORTED_CODEC"
  | "HASH_FAILURE"

export type VerificationFailureState =
  | "IDENTITY_INVALID"
  | "NO_CANDIDATES"
  | "SOURCE_UNTRUSTED"
  | "SOURCE_UNAVAILABLE"
  | "IMAGE_DOWNLOAD_FAILED"
  | "IMAGE_FORMAT_INVALID"
  | "IMAGE_CORRUPTED"
  | "IMAGE_TOO_LARGE"
  | "IMAGE_TOO_SMALL"
  | "IMAGE_LOW_QUALITY"
  | "NOT_A_REAL_PHOTO"
  | "AI_GENERATED"
  | "CGI_RENDER"
  | "3D_RENDER"
  | "ILLUSTRATION"
  | "CARTOON"
  | "CONCEPT_ART"
  | "HEAVILY_MANIPULATED"
  | "WRONG_MAKE"
  | "WRONG_MODEL"
  | "WRONG_YEAR"
  | "WRONG_GENERATION"
  | "WRONG_FACELIFT"
  | "WRONG_BODY_STYLE"
  | "WRONG_TRIM"
  | "VEHICLE_UNCERTAIN"
  | "AUTHENTICITY_UNCERTAIN"
  | "MATCH_CONFIDENCE_TOO_LOW"
  | "DUPLICATE_IMAGE"
  | "METADATA_CONFLICT"
  | "VERIFICATION_TIMEOUT"
  | "POLICY_REJECTED"
  | "MANUAL_REVIEW_REQUIRED"

export interface VerificationFailure {
  code: string
  state: VerificationFailureState
  severity: FailureSeverity
  candidateId?: string
  message: string
  reasons: string[]
  retryable: boolean
  requiresManualReview: boolean
  timestamp: string
}

export interface VerificationWarning {
  code: string
  message: string
}

export interface IdentityAssessment {
  make: MatchResult
  model: MatchResult
  year: MatchResult
  generation: MatchResult
  facelift: MatchResult
  bodyStyle: MatchResult
  trim: MatchResult
  overallIdentity: "PASS" | "FAIL" | "UNCERTAIN"
}

export interface AuthenticityAssessment {
  decision: AuthenticityDecision
  confidence: number
  isSynthetic: boolean
}

export interface SourceAssessment {
  sourceType: string
  domain: string
  reputationScore: number
  sourceStatus: "TRUSTED" | "KNOWN" | "UNTRUSTED" | "BLOCKED" | "UNKNOWN"
  licensingStatus: "ALLOWED" | "RESTRICTED" | "UNKNOWN"
}

export interface QualityAssessment {
  resolution: number
  sharpness: number
  brightness: number
  visibility: number
  overall: "PASS" | "FAIL" | "BORDERLINE"
}

export interface TechnicalAssessment {
  passed: boolean
  failures: TechnicalFailure[]
}

export interface PolicyAssessment {
  policyAllowed: boolean
  reasons: string[]
}

export interface ConfidenceAssessment {
  score: number
  thresholdPassed: boolean
}

export interface VerificationAssessment {
  identity: IdentityAssessment
  authenticity: AuthenticityAssessment
  source: SourceAssessment
  quality: QualityAssessment
  technical: TechnicalAssessment
  policy: PolicyAssessment
  confidence: ConfidenceAssessment
  failures: VerificationFailure[]
  warnings: VerificationWarning[]
  finalDecision: VerificationDecision
}

export interface VehicleIdentity {
  make: string
  model: string
  year?: number
  generation?: string
  facelift?: string
  trim?: string
  bodyStyle?: BodyStyle
  market?: string
}

export interface VerifiedVehicleImage {
  id: string
  vehicleId: string
  imageUrl: string
  sourceUrl?: string
  sourceType: SourceType
  status: ImageStatus
  imageType: ImageType
  vehicleMatch: {
    make: boolean
    model: boolean
    year: boolean | null
    generation: boolean | null
    bodyStyle: boolean | null
    trim: boolean | null
  }
  confidenceScore: number
  isRepresentative: boolean
  hasTransparentBackground: boolean
  contentHash?: string
  verifiedAt: string
  expiresAt?: string
}

export interface ImageCandidate {
  url: string
  sourceUrl?: string
  title?: string
  altText?: string
  mimeType?: string
  sourceType?: string
  metadata?: {
    make?: string
    model?: string
    year?: number
    generation?: string
    bodyStyle?: string
    trim?: string
  }
}

export interface ImageSearchOptions {
  maxResults?: number
  preferredSourceTypes?: string[]
  requireRealPhoto?: boolean
  requireExactYear?: boolean
  region?: string
}

export interface ImageSearchResult {
  candidates: ImageCandidate[]
  provider: string
  query: string
}

export interface ImageValidationResult {
  accepted: boolean
  imageType: ImageType
  confidenceScore: number
  vehicleMatch: {
    make: boolean
    model: boolean
    year: boolean | null
    generation: boolean | null
    bodyStyle: boolean | null
    trim: boolean | null
  }
  assessment?: VerificationAssessment
  failure?: VerificationFailure
  reasons: string[]
  warnings: string[]
}

export interface AuthenticityResult {
  type: ImageType
  confidence: number
  indicators: {
    photographicEvidence: number
    syntheticEvidence: number
    renderingEvidence: number
    manipulationEvidence: number
  }
}

export interface VehicleMatchResult {
  makeMatch: boolean
  modelMatch: boolean
  yearMatch: boolean | null
  generationMatch: boolean | null
  faceliftMatch: boolean | null
  bodyStyleMatch: boolean | null
  trimMatch: boolean | null
  confidenceScore: number
  evidence: string[]
}

export interface ResolveImageOptions {
  allowRepresentativeImage?: boolean
  requireExactYear?: boolean
  allowTransparentBackground?: boolean
  forceRefresh?: boolean
}

export interface ResolveImageResponse {
  status: "VERIFIED" | "REPRESENTATIVE" | "UNAVAILABLE"
  image?: VerifiedVehicleImage
  failure?: VerificationFailure
  assessment?: VerificationAssessment
  placeholder?: {
    title: string
    message: string
  }
  verification: {
    confidenceScore: number
    verifiedAt: string
  }
}

export interface ImageResolutionLog {
  requestId: string
  vehicleId: string
  vehicle: VehicleIdentity
  candidatesFound: number
  candidatesRejected: number
  selectedImageId?: string
  finalStatus: "VERIFIED" | "REPRESENTATIVE" | "UNAVAILABLE"
  failureState?: VerificationFailureState
  rejectionReasons: string[]
  processingTimeMs: number
  timestamp: string
}
