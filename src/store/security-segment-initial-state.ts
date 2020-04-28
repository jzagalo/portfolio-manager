import { SECURITY_SEGMENT_DEVELOPED_TEXT, SECURITY_SEGMENT_EMERGING_TEXT,
    SECURITY_SEGMENT_LARGE_CAP_TEXT, SECURITY_SEGMENT_MID_CAP_TEXT,
    SECURITY_SEGMENT_SMALL_CAP_TEXT  } from "@/store/security-constants";
import { SecuritySegmentModel } from "@/store/security-segment-model";
import { ISecuritySegmentModelState } from "@/store/security-types";

const segments: SecuritySegmentModel[] = [];

function  createSegment(id: number, text: string) {
    segments.push(new SecuritySegmentModel(id, text));
    return id += 1;
}

let index = 1;
index = createSegment(index, SECURITY_SEGMENT_LARGE_CAP_TEXT);
index = createSegment(index, SECURITY_SEGMENT_MID_CAP_TEXT);
index = createSegment(index, SECURITY_SEGMENT_SMALL_CAP_TEXT);
index = createSegment(index, SECURITY_SEGMENT_DEVELOPED_TEXT);
index = createSegment(index, SECURITY_SEGMENT_EMERGING_TEXT);

export const initialState: ISecuritySegmentModelState = {
    index,
    items: segments,
}