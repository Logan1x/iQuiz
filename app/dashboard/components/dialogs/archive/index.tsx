import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

type Props = {
  confirmFn: () => void;
};

const ArchiveDialog = (props: Props) => {
  const { confirmFn } = props;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. You won't be able to retrieve this quiz
          later.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant={"ghost"}>Cancel</Button>
        </DialogClose>
        <Button variant={"destructive"} type="submit" onClick={confirmFn}>
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export { ArchiveDialog };
