import { NextRequest, NextResponse } from "next/server"
import { normalizeVehicleIdentity, verifyCandidateImage, ImageCandidate } from "@/lib/imageVerification"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { targetVehicle, candidate } = body

    if (!targetVehicle || !candidate) {
      return NextResponse.json(
        { error: "targetVehicle and candidate parameters are required" },
        { status: 400 }
      )
    }

    const normalizedTarget = normalizeVehicleIdentity({
      make: targetVehicle.make || "",
      model: targetVehicle.model || "",
      year: targetVehicle.year || 2024,
      generation: targetVehicle.generation,
      trim: targetVehicle.trim,
      bodyStyle: targetVehicle.bodyStyle || targetVehicle.category
    })

    const imageCandidate: ImageCandidate = {
      url: candidate.url,
      sourceUrl: candidate.sourceUrl,
      sourceTier: candidate.sourceTier || "established_automotive",
      photoAuthenticity: candidate.photoAuthenticity || "REAL_PHOTO",
      caption: candidate.caption,
      candidateMake: candidate.candidateMake || normalizedTarget.make,
      candidateModel: candidate.candidateModel || normalizedTarget.model,
      candidateYear: candidate.candidateYear || normalizedTarget.year,
      candidateGeneration: candidate.candidateGeneration || normalizedTarget.generation,
      candidateBodyStyle: candidate.candidateBodyStyle || normalizedTarget.bodyStyle,
      candidateTrim: candidate.candidateTrim || normalizedTarget.trim,
      imageQualityScore: candidate.imageQualityScore !== undefined ? candidate.imageQualityScore : 5
    }

    const result = verifyCandidateImage(normalizedTarget, imageCandidate)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Verification failed" }, { status: 500 })
  }
}
