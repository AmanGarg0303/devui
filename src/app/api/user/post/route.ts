import { getRandomNumber } from "@/lib/utils";
import { CustomErrorReporter } from "@/validator/customErrorReporter";
import { imageValidator } from "@/validator/imageValidator";
import { postSchema } from "@/validator/postSchema";
import vine, { errors } from "@vinejs/vine";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      image: file?.name,
      user_id: formData.get("user_id"),
    };

    // * Vine validation logic
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(postSchema);
    const validatedData = await validator.validate(data);

    // * Image validation
    const isImgNotValid: string | null = imageValidator(file?.name, file?.size);
    if (isImgNotValid) {
      return NextResponse.json({
        status: 400,
        errors: { image: isImgNotValid },
      });
    }

    // * Image upload
    const buffer = Buffer.from(await file!.arrayBuffer());
    const relativeUploadDir = "/uploads";
    const uploadDir = join(process.cwd(), "/public", relativeUploadDir);

    const uniqueName = Date.now() + "_" + getRandomNumber(1, 99999);
    const imgExt = file?.name.split(".");
    const fileName = uniqueName + "." + imgExt?.[1];

    await writeFile(`${uploadDir}/${fileName}`, buffer);

    await prisma?.post.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        user_id: Number(data.user_id),
        image: fileName,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Post created successfully",
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({ status: 400, errors: error.messages });
    }
  }
}
