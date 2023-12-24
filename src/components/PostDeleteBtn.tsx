"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

export default function PostDeleteBtn({ id }: { id: number }) {
  const router = useRouter();
  const { toast } = useToast();

  const deletePost = () => {
    axios
      .delete(`/api/user/post/${id}`)
      .then((res) => {
        const response = res.data;
        if (response.status == 200) {
          toast({
            title: "Success!",
            description: response.message,
            className: "bg-green-300",
          });
          router.refresh();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div
          className={buttonVariants({ variant: "destructive", size: "icon" })}
        >
          <Trash2Icon />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={deletePost}
          >
            Yes, Delete It
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
