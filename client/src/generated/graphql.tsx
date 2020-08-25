import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  books: Array<Book>;
  book?: Maybe<Book>;
  me?: Maybe<User>;
  myBooks: Array<UserBook>;
  myBook?: Maybe<UserBook>;
  myBookshelves?: Maybe<Array<Bookshelf>>;
  myBookshelf?: Maybe<Bookshelf>;
};

export type QueryBookArgs = {
  id: Scalars["Float"];
};

export type QueryMyBookArgs = {
  id: Scalars["Float"];
};

export type QueryMyBookshelfArgs = {
  name: Scalars["String"];
};

export type Book = {
  __typename?: "Book";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  title: Scalars["String"];
  googleId: Scalars["String"];
  author: Scalars["String"];
  thumbnail: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  email: Scalars["String"];
  name: Scalars["String"];
};

export type UserBook = {
  __typename?: "UserBook";
  id: Scalars["Float"];
  readingStatus: Scalars["String"];
  favorited: Scalars["Boolean"];
  rating?: Maybe<Scalars["Float"]>;
  bookId?: Scalars["Float"];
  userId?: Scalars["Float"];
  book: Book;
  user?: User;
  createdAt?: Scalars["String"];
  updatedAt?: Scalars["String"];
};

export type Bookshelf = {
  __typename?: "Bookshelf";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  name: Scalars["String"];
  userId: Scalars["Float"];
  bookshelvesUserBooks: Array<BookshelvesUserBook>;
};

export type BookshelvesUserBook = {
  __typename?: "BookshelvesUserBook";
  bookshelfId: Scalars["Float"];
  userBookId?: Maybe<Scalars["Float"]>;
  userBook?: Maybe<UserBook>;
  bookshelf?: Maybe<Bookshelf>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createBook: Book;
  updateBook?: Maybe<Book>;
  deleteBook: Scalars["Boolean"];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars["Boolean"];
  createUserBook: UserBook;
  updateUserBook?: Maybe<UserBook>;
  deleteUserBook: Scalars["Boolean"];
  createBookshelf: Bookshelf;
  addBookToBookshelf: Bookshelf;
  removeBookToBookshelf: Bookshelf;
  updateBookshelf?: Maybe<Bookshelf>;
  deleteBookshelf: Scalars["Boolean"];
};

export type MutationCreateBookArgs = {
  options: Options;
};

export type MutationUpdateBookArgs = {
  options: Options;
  id: Scalars["Float"];
};

export type MutationDeleteBookArgs = {
  id: Scalars["Float"];
};

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type MutationCreateUserBookArgs = {
  options: UserBookOptions;
};

export type MutationUpdateUserBookArgs = {
  options: UserBookOptions;
  id: Scalars["Float"];
};

export type MutationDeleteUserBookArgs = {
  id: Scalars["Float"];
};

export type MutationCreateBookshelfArgs = {
  options: BookshelfOptions;
};

export type MutationAddBookToBookshelfArgs = {
  userBookId: Scalars["Float"];
  id: Scalars["Float"];
};

export type MutationRemoveBookToBookshelfArgs = {
  userBookId: Scalars["Float"];
  id: Scalars["Float"];
};

export type MutationUpdateBookshelfArgs = {
  options: BookshelfOptions;
  id: Scalars["Float"];
};

export type MutationDeleteBookshelfArgs = {
  id: Scalars["Float"];
};

export type Options = {
  title: Scalars["String"];
  googleId: Scalars["String"];
  author: Scalars["String"];
  thumbnail: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type UsernamePasswordInput = {
  email: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  password: Scalars["String"];
};

export type UserBookOptions = {
  readingStatus?: Maybe<Scalars["String"]>;
  bookId?: Maybe<Scalars["Float"]>;
  favorited?: Maybe<Scalars["Boolean"]>;
  rating?: Maybe<Scalars["Float"]>;
};

export type BookshelfOptions = {
  name?: Maybe<Scalars["String"]>;
};

export type CreateBookshelfMutationVariables = Exact<{
  name: Scalars["String"];
}>;

export type CreateBookshelfMutation = { __typename?: "Mutation" } & {
  createBookshelf: { __typename?: "Bookshelf" } & Pick<
    Bookshelf,
    "id" | "name"
  >;
};

export type DeleteBookshelfMutationVariables = Exact<{
  id: Scalars["Float"];
}>;

export type DeleteBookshelfMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteBookshelf"
>;

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "UserResponse" } & {
    user?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "email" | "name">>;
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "message" | "field">
      >
    >;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type RegisterMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
  name: Scalars["String"];
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserResponse" } & {
    user?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "email" | "name">>;
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >;
  };
};

export type UpdateBookshelfMutationVariables = Exact<{
  name: Scalars["String"];
  id: Scalars["Float"];
}>;

export type UpdateBookshelfMutation = { __typename?: "Mutation" } & {
  updateBookshelf?: Maybe<
    { __typename?: "Bookshelf" } & Pick<Bookshelf, "id" | "name">
  >;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "email" | "name">>;
};

export type MyBooksQueryVariables = Exact<{ [key: string]: never }>;

export type MyBooksQuery = { __typename?: "Query" } & {
  myBooks: Array<
    { __typename?: "UserBook" } & Pick<
      UserBook,
      "id" | "readingStatus" | "favorited" | "rating"
    > & {
        book: { __typename?: "Book" } & Pick<
          Book,
          "id" | "googleId" | "author" | "thumbnail" | "title"
        >;
      }
  >;
};

export type MyBookshelfQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type MyBookshelfQuery = { __typename?: "Query" } & {
  myBookshelf?: Maybe<
    { __typename?: "Bookshelf" } & Pick<Bookshelf, "id" | "name"> & {
        bookshelvesUserBooks: Array<
          { __typename?: "BookshelvesUserBook" } & {
            userBook?: Maybe<
              { __typename?: "UserBook" } & Pick<
                UserBook,
                "id" | "readingStatus" | "favorited" | "rating"
              > & {
                  book: { __typename?: "Book" } & Pick<
                    Book,
                    "id" | "googleId" | "author" | "thumbnail" | "title"
                  >;
                }
            >;
          }
        >;
      }
  >;
};

export type MyBookshelvesQueryVariables = Exact<{ [key: string]: never }>;

export type MyBookshelvesQuery = { __typename?: "Query" } & {
  myBookshelves?: Maybe<
    Array<
      { __typename?: "Bookshelf" } & Pick<Bookshelf, "id" | "name"> & {
          bookshelvesUserBooks: Array<
            { __typename?: "BookshelvesUserBook" } & {
              userBook?: Maybe<
                { __typename?: "UserBook" } & Pick<
                  UserBook,
                  "id" | "readingStatus" | "favorited" | "rating"
                > & {
                    book: { __typename?: "Book" } & Pick<
                      Book,
                      "id" | "googleId" | "author" | "thumbnail" | "title"
                    >;
                  }
              >;
            }
          >;
        }
    >
  >;
};

export const CreateBookshelfDocument = gql`
  mutation createBookshelf($name: String!) {
    createBookshelf(options: { name: $name }) {
      id
      name
    }
  }
`;
export type CreateBookshelfMutationFn = Apollo.MutationFunction<
  CreateBookshelfMutation,
  CreateBookshelfMutationVariables
>;

/**
 * __useCreateBookshelfMutation__
 *
 * To run a mutation, you first call `useCreateBookshelfMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookshelfMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookshelfMutation, { data, loading, error }] = useCreateBookshelfMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateBookshelfMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBookshelfMutation,
    CreateBookshelfMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateBookshelfMutation,
    CreateBookshelfMutationVariables
  >(CreateBookshelfDocument, baseOptions);
}
export type CreateBookshelfMutationHookResult = ReturnType<
  typeof useCreateBookshelfMutation
>;
export type CreateBookshelfMutationResult = Apollo.MutationResult<
  CreateBookshelfMutation
>;
export type CreateBookshelfMutationOptions = Apollo.BaseMutationOptions<
  CreateBookshelfMutation,
  CreateBookshelfMutationVariables
>;
export const DeleteBookshelfDocument = gql`
  mutation deleteBookshelf($id: Float!) {
    deleteBookshelf(id: $id)
  }
`;
export type DeleteBookshelfMutationFn = Apollo.MutationFunction<
  DeleteBookshelfMutation,
  DeleteBookshelfMutationVariables
>;

/**
 * __useDeleteBookshelfMutation__
 *
 * To run a mutation, you first call `useDeleteBookshelfMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookshelfMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookshelfMutation, { data, loading, error }] = useDeleteBookshelfMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBookshelfMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteBookshelfMutation,
    DeleteBookshelfMutationVariables
  >
) {
  return Apollo.useMutation<
    DeleteBookshelfMutation,
    DeleteBookshelfMutationVariables
  >(DeleteBookshelfDocument, baseOptions);
}
export type DeleteBookshelfMutationHookResult = ReturnType<
  typeof useDeleteBookshelfMutation
>;
export type DeleteBookshelfMutationResult = Apollo.MutationResult<
  DeleteBookshelfMutation
>;
export type DeleteBookshelfMutationOptions = Apollo.BaseMutationOptions<
  DeleteBookshelfMutation,
  DeleteBookshelfMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(options: { email: $email, password: $password }) {
      user {
        id
        email
        name
      }
      errors {
        message
        field
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($email: String!, $password: String!, $name: String!) {
    register(options: { email: $email, password: $password, name: $name }) {
      user {
        id
        email
        name
      }
      errors {
        field
        message
      }
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const UpdateBookshelfDocument = gql`
  mutation updateBookshelf($name: String!, $id: Float!) {
    updateBookshelf(id: $id, options: { name: $name }) {
      id
      name
    }
  }
`;
export type UpdateBookshelfMutationFn = Apollo.MutationFunction<
  UpdateBookshelfMutation,
  UpdateBookshelfMutationVariables
>;

/**
 * __useUpdateBookshelfMutation__
 *
 * To run a mutation, you first call `useUpdateBookshelfMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookshelfMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookshelfMutation, { data, loading, error }] = useUpdateBookshelfMutation({
 *   variables: {
 *      name: // value for 'name'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateBookshelfMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateBookshelfMutation,
    UpdateBookshelfMutationVariables
  >
) {
  return Apollo.useMutation<
    UpdateBookshelfMutation,
    UpdateBookshelfMutationVariables
  >(UpdateBookshelfDocument, baseOptions);
}
export type UpdateBookshelfMutationHookResult = ReturnType<
  typeof useUpdateBookshelfMutation
>;
export type UpdateBookshelfMutationResult = Apollo.MutationResult<
  UpdateBookshelfMutation
>;
export type UpdateBookshelfMutationOptions = Apollo.BaseMutationOptions<
  UpdateBookshelfMutation,
  UpdateBookshelfMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      email
      name
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyBooksDocument = gql`
  query MyBooks {
    myBooks {
      id
      readingStatus
      favorited
      rating
      book {
        id
        googleId
        author
        thumbnail
        title
      }
    }
  }
`;

/**
 * __useMyBooksQuery__
 *
 * To run a query within a React component, call `useMyBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyBooksQuery(
  baseOptions?: Apollo.QueryHookOptions<MyBooksQuery, MyBooksQueryVariables>
) {
  return Apollo.useQuery<MyBooksQuery, MyBooksQueryVariables>(
    MyBooksDocument,
    baseOptions
  );
}
export function useMyBooksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyBooksQuery, MyBooksQueryVariables>
) {
  return Apollo.useLazyQuery<MyBooksQuery, MyBooksQueryVariables>(
    MyBooksDocument,
    baseOptions
  );
}
export type MyBooksQueryHookResult = ReturnType<typeof useMyBooksQuery>;
export type MyBooksLazyQueryHookResult = ReturnType<typeof useMyBooksLazyQuery>;
export type MyBooksQueryResult = Apollo.QueryResult<
  MyBooksQuery,
  MyBooksQueryVariables
>;
export const MyBookshelfDocument = gql`
  query MyBookshelf($name: String!) {
    myBookshelf(name: $name) {
      id
      name
      bookshelvesUserBooks {
        userBook {
          id
          readingStatus
          favorited
          rating
          book {
            id
            googleId
            author
            thumbnail
            title
          }
        }
      }
    }
  }
`;

/**
 * __useMyBookshelfQuery__
 *
 * To run a query within a React component, call `useMyBookshelfQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyBookshelfQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyBookshelfQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useMyBookshelfQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyBookshelfQuery,
    MyBookshelfQueryVariables
  >
) {
  return Apollo.useQuery<MyBookshelfQuery, MyBookshelfQueryVariables>(
    MyBookshelfDocument,
    baseOptions
  );
}
export function useMyBookshelfLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyBookshelfQuery,
    MyBookshelfQueryVariables
  >
) {
  return Apollo.useLazyQuery<MyBookshelfQuery, MyBookshelfQueryVariables>(
    MyBookshelfDocument,
    baseOptions
  );
}
export type MyBookshelfQueryHookResult = ReturnType<typeof useMyBookshelfQuery>;
export type MyBookshelfLazyQueryHookResult = ReturnType<
  typeof useMyBookshelfLazyQuery
>;
export type MyBookshelfQueryResult = Apollo.QueryResult<
  MyBookshelfQuery,
  MyBookshelfQueryVariables
>;
export const MyBookshelvesDocument = gql`
  query MyBookshelves {
    myBookshelves {
      id
      name
      bookshelvesUserBooks {
        userBook {
          id
          readingStatus
          favorited
          rating
          book {
            id
            googleId
            author
            thumbnail
            title
          }
        }
      }
    }
  }
`;

/**
 * __useMyBookshelvesQuery__
 *
 * To run a query within a React component, call `useMyBookshelvesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyBookshelvesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyBookshelvesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyBookshelvesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyBookshelvesQuery,
    MyBookshelvesQueryVariables
  >
) {
  return Apollo.useQuery<MyBookshelvesQuery, MyBookshelvesQueryVariables>(
    MyBookshelvesDocument,
    baseOptions
  );
}
export function useMyBookshelvesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyBookshelvesQuery,
    MyBookshelvesQueryVariables
  >
) {
  return Apollo.useLazyQuery<MyBookshelvesQuery, MyBookshelvesQueryVariables>(
    MyBookshelvesDocument,
    baseOptions
  );
}
export type MyBookshelvesQueryHookResult = ReturnType<
  typeof useMyBookshelvesQuery
>;
export type MyBookshelvesLazyQueryHookResult = ReturnType<
  typeof useMyBookshelvesLazyQuery
>;
export type MyBookshelvesQueryResult = Apollo.QueryResult<
  MyBookshelvesQuery,
  MyBookshelvesQueryVariables
>;
