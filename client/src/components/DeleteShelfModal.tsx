import React, { Dispatch, SetStateAction, useRef } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/core";
import { useDeleteBookshelfMutation } from "../generated/graphql";

interface DeleteShelfModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
}

export const DeleteShelfModal: React.FC<DeleteShelfModalProps> = ({
  isOpen,
  setIsOpen,
  id,
}) => {
  const cancelRef = useRef(null);
  const [deleteBookshelf] = useDeleteBookshelfMutation();
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => setIsOpen(false)}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Delete Bookshelf
        </AlertDialogHeader>

        <AlertDialogBody>
          Are you sure? You can't undo this action afterwards.
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            variantColor="red"
            onClick={() => {
              deleteBookshelf({
                variables: { id: id },
                update: (cache) => {
                  cache.evict({ id: "Bookshelf:" + id });
                },
              });
              setIsOpen(false);
            }}
            ml={3}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
