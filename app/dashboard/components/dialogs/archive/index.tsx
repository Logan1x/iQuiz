import { Button } from "@/components/ui/button";
import {
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
          This action cannot be undone. This will permanently delete this quiz
          from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant={"ghost"}>Cancel</Button>
        <Button variant={"destructive"} type="submit" onClick={confirmFn}>
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export { ArchiveDialog };
