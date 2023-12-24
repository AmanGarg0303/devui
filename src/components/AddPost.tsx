"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { loadingSvg } from "@/svgs/svgs";

export default function AddPost({ user_id }: { user_id: string }) {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  const [postState, setPostState] = useState({
    title: "",
    description: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<PostErrorType>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file!);
  };

  const submit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", postState.title);
    formData.append("description", postState.description);
    formData.append("image", file!);
    formData.append("user_id", user_id);

    axios
      .post(`/api/user/post`, formData)
      .then((res) => {
        const response = res.data;
        if (response.status == 200) {
          alert(response.message);
        } else if (response.status == 400) {
          setErrors(response.errors);
        }
      })
      .catch((err) => console.log("The post error is: ", err))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Sheet open={sheetOpen}>
        <SheetTrigger asChild>
          <Button onClick={() => setSheetOpen(true)}>Add Post</Button>
        </SheetTrigger>
        <SheetContent showCloseBtn={false}>
          <SheetHeader>
            <SheetTitle>Add your amazing work!!</SheetTitle>
            <SheetDescription>
              Display your awesome UI/UX work to the world.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-4 ">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Title here"
              onChange={(e) =>
                setPostState({ ...postState, title: e.target.value })
              }
            />
            <span className="text-red-500 text-sm">{errors?.title}</span>
          </div>

          <div className="mt-4 ">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              placeholder="Description here"
              onChange={(e) =>
                setPostState({ ...postState, description: e.target.value })
              }
            ></Textarea>
            <span className="text-red-500 text-sm">{errors?.description}</span>
          </div>

          <div className="mt-4 ">
            <Label htmlFor="file">Image</Label>
            <Input
              type="file"
              id="file"
              placeholder="Your file here"
              onChange={handleFileChange}
            />
            <span className="text-red-500 text-sm">{errors?.image}</span>
          </div>

          <SheetFooter className="mt-4">
            <Button onClick={submit} disabled={loading} className="w-full">
              {loading ? <>{loadingSvg}</> : "Submit"}
            </Button>
            <Button
              variant="destructive"
              onClick={() => setSheetOpen(false)}
              className="w-full"
            >
              Close
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
