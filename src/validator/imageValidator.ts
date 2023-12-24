import { bytesToMb } from "@/lib/utils";

export function imageValidator(
  name: string | undefined,
  size: number | undefined
): string | null {
  let flag: string | null = null;

  if (name) {
    const getImgExt = name.split(".");
    const imgExtTypes: Array<string> = ["png", "jpg", "jpeg", "svg", "gif"];
    if (!imgExtTypes.includes(getImgExt[1])) {
      flag = "Image must be png, jpg, jpeg, svg or gif.";
    } else {
      flag = null;
    }
  } else if (size) {
    const fileInMb = bytesToMb(size);
    if (fileInMb > 2) {
      flag = "Image should be less than 2Mb.";
    } else {
      flag = null;
    }
  }

  return flag;
}
