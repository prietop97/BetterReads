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
import {
  useMyBooksQuery,
  useMyBookshelfQuery,
  useAddBooksToShelfMutation,
  useRemoveBooksFromShelfMutation,
  MyBookshelvesDocument,
} from "../generated/graphql";
// import { useRouter } from "next/router";

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
  // const router = useRouter();
  // if (error) router.push("/login");
  const { data: bookshelfBooks } = useMyBookshelfQuery({ variables: { name } });
  const [addBookToShelf] = useAddBooksToShelfMutation();
  const [removeBookFromShelf] = useRemoveBooksFromShelfMutation();
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
    setToRemove({});
    setToAdd({});
  }, [isOpen]);
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
                <Flex key={x.id}>
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
              onClick={async () => {
                if (Object.keys(toAdd).length) {
                  console.log(toAdd);
                  await addBookToShelf({
                    variables: {
                      shelfId: id,
                      bookIds: Object.values(toAdd).map((x) => x.id),
                    },
                    refetchQueries: [{ query: MyBookshelvesDocument }],
                  });
                }
                if (Object.keys(toRemove).length) {
                  await removeBookFromShelf({
                    variables: {
                      shelfId: id,
                      bookIds: Object.values(toRemove).map((x) => x.id),
                    },
                    refetchQueries: [{ query: MyBookshelvesDocument }],
                  });
                }
                setIsOpen(false);
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
