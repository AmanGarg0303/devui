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

export default function AddPost() {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  const [postState, setPostState] = useState({
    title: "",
    description: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file!);
  };

  const submit = () => {
    console.log(postState);
    console.log(file);
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
          </div>

          <div className="mt-4 ">
            <Label htmlFor="file">Image</Label>
            <Input
              type="file"
              id="file"
              placeholder="Your file here"
              onChange={handleFileChange}
            />
          </div>

          <SheetFooter className="mt-4">
            <Button onClick={submit}>Submit</Button>
            <Button variant="destructive" onClick={() => setSheetOpen(false)}>
              Close
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
