import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/core";
import { BookCard } from "./BookCard";
import { UserBook } from "../generated/graphql";
import { DeleteShelfModal } from "./DeleteShelfModal";
import { EditShelfModal } from "./EditShelfModal";
import { ManageBookshelfModal } from "./ManageBookshelfModal";
import { useRouter } from "next/router";

interface HomeLibrariesProps {
  library: string;
  books: any | undefined;
  onlyImage?: boolean;
  id?: number;
  limit?: number;
}

export const HomeLibrary: React.FC<HomeLibrariesProps> = ({
  library,
  books,
  onlyImage = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const router = useRouter();
  console.log(id);
  return (
    <Box mt={2} borderBottom="1px solid rgb(217,217,217)">
      <DeleteShelfModal isOpen={isOpen} setIsOpen={setIsOpen} id={id!} />
      <EditShelfModal
        isOpen={editOpen}
        setIsOpen={setEditOpen}
        id={id!}
        name={library}
      />
      <ManageBookshelfModal
        isOpen={addOpen}
        setIsOpen={setAddOpen}
        id={id!}
        name={library}
      />
      <Flex justifyContent="space-between">
        <Flex w={"90%"} alignItems="center">
          <Text
            m="0 0"
            color="#4e4c4a"
            fontSize="1.25rem"
            fontWeight="bold"
            lineHeight="1.875rem"
            pb="1rem"
            mr="0.4rem"
          >
            {library} ({books?.length || 0})
          </Text>
          {id && (
            <Menu>
              <MenuButton>
                <Text
                  m="0 0"
                  color="#4e4c4a"
                  fontSize="1.25rem"
                  fontWeight="bold"
                  lineHeight="1.875rem"
                >
                  ...
                </Text>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setAddOpen(true)}>
                  Manage Books
                </MenuItem>
                {/* <MenuItem onClick={() => setEditOpen(true)}>Update</MenuItem> */}
                <MenuItem onClick={() => setIsOpen(true)}>Delete</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
        {router.route !== "/shelves" && <Text>View All</Text>}
      </Flex>
      <Flex
        justifyContent={onlyImage ? "flex-start" : "space-between"}
        flexWrap="wrap"
      >
        {books &&
          books?.map((x: UserBook) => {
            return (
              <BookCard
                key={x.id}
                id={x.id}
                googleId={x.book.googleId!}
                imageUrl={x.book.thumbnail!}
                title={x.book.title!}
                author={x.book.author!}
                rating={x.rating!}
                favorited={x.favorited}
                status={x.readingStatus}
                onlyImage={onlyImage}
              />
            );
          })}
      </Flex>
    </Box>
  );
};
