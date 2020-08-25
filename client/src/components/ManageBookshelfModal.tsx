import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Flex,
  Text,
  Box,
  Checkbox,
  ModalFooter,
} from "@chakra-ui/core";
import { useMyBooksQuery, useMyBookshelfQuery } from "../generated/graphql";

interface addBookModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
  name: string;
}

export const ManageBookshelfModal: React.FC<addBookModalProps> = ({
  isOpen,
  setIsOpen,
  id,
  name,
}) => {
  const { data } = useMyBooksQuery();
  const { data: bookshelfBooks } = useMyBookshelfQuery({ variables: { name } });
  const [newBooks, setNewBooks] = useState<Record<any, any>>({});
  const [toRemove, setToRemove] = useState<Record<any, any>>({});
  const [toAdd, setToAdd] = useState<Record<any, any>>({});

  useEffect(() => {
    const books: Record<number, any> = {};
    data?.myBooks.forEach((x) => {
      books[x.id] = { ...x };
      books[x.id].inBookshelf = false;
    });
    bookshelfBooks?.myBookshelf?.bookshelvesUserBooks.forEach((y) => {
      if (books[y.userBook!.id]) {
        books[y.userBook!.id].inBookshelf = true;
      }
    });
    setNewBooks(books);
  }, []);
  useEffect(() => {
    console.log(toRemove);
    console.log(toAdd);
  }, [toRemove, toAdd]);
  return (
    <Modal isOpen={isOpen} isCentered onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update shelf books</ModalHeader>
        <ModalCloseButton onClick={() => setIsOpen(false)} />
        <ModalBody>
          <Box>
            {Object.values(newBooks).length ? (
              Object.values(newBooks).map((x: any) => (
                <Flex>
                  <Checkbox
                    isChecked={x.inBookshelf}
                    name={x.id}
                    size="md"
                    variantColor={x.inBookshelf ? "green" : "orange"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (toRemove[e.target.name]) {
                          const remove = { ...toRemove };
                          delete remove[e.target.name];
                          setToRemove(remove);
                        } else {
                          const toAddNew = { ...toAdd };
                          toAddNew[e.target.name] = {
                            ...newBooks[e.target.name],
                          };
                          setToAdd(toAddNew);
                        }
                      } else {
                        if (toAdd[e.target.name]) {
                          const add = { ...toAdd };
                          delete add[e.target.name];
                          setToAdd(add);
                        } else {
                          const toRemoveNew = { ...toRemove };
                          toRemoveNew[e.target.name] = {
                            ...newBooks[e.target.name],
                          };
                          setToRemove(toRemoveNew);
                        }
                      }
                      setNewBooks({
                        ...newBooks,
                        [e.target.name]: {
                          ...newBooks[e.target.name],
                          inBookshelf: e.target.checked,
                        },
                      });
                    }}
                  />
                  <Text ml="0.3rem">{x.book.title}</Text>
                </Flex>
              ))
            ) : (
              <Text>No books to add</Text>
            )}
          </Box>
          <ModalFooter>
            <Button
              onClick={() => {
                if (Object.keys(toAdd).length) {
                  // ADD TO BOOKSHELF
                }
                if (Object.keys(toRemove).length) {
                  // REMOVE FROM BOOKSHELF
                }
                // TOAST
              }}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
