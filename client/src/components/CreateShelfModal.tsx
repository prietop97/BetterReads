import React, { Dispatch, SetStateAction } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { InputField } from "./InputField";
import {
  useCreateBookshelfMutation,
  MyBookshelvesDocument,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface CreateShelfModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateShelfModal: React.FC<CreateShelfModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [createBookshelf] = useCreateBookshelfMutation();
  const router = useRouter();
  return (
    <Modal isOpen={isOpen} isCentered onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new shelf</ModalHeader>
        <ModalCloseButton onClick={() => setIsOpen(false)} />
        <ModalBody>
          <Formik
            initialValues={{ name: "" }}
            onSubmit={async (values, { setErrors }) => {
              const bookshelf = await createBookshelf({
                variables: { name: values.name },
                refetchQueries: [{ query: MyBookshelvesDocument }],
              });
              if (bookshelf.data?.createBookshelf.bookshelf) {
                setIsOpen(false);
                router.push("/shelves");
              } else {
                setErrors(toErrorMap(bookshelf.data!.createBookshelf!.errors!));
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField name="name" placeholder="Enter shelf name" />
                <Button
                  mt={"1rem"}
                  type="submit"
                  isLoading={isSubmitting}
                  isFullWidth
                  variantColor="blue"
                >
                  Create Shelf
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
