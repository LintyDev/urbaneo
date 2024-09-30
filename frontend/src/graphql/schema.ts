import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
  EmailAddress: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  icon: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type CategoryCreateInput = {
  icon: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CategoryUpdateInput = {
  icon?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type City = {
  __typename?: 'City';
  coordinates: PointObject;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  zip_code: Scalars['Float']['output'];
};

export type CityCreateInput = {
  gps_coordinates: PointInput;
  name: Scalars['String']['input'];
  zip_code: Scalars['Float']['input'];
};

export type CityUpdateInput = {
  gps_coordinates?: InputMaybe<PointInput>;
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  zip_code?: InputMaybe<Scalars['Float']['input']>;
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  AddRole: Message;
  addReview: Review;
  createCategory: Category;
  createCity: City;
  createPOI: Poi;
  delereRoles: Message;
  deleteCategory: Scalars['Boolean']['output'];
  deleteCity: Scalars['Boolean']['output'];
  deletePOI: Scalars['Boolean']['output'];
  deleteReview: Message;
  deleteUser: Message;
  register: Message;
  updateCategory: Category;
  updateCity: City;
  updatePOI: Poi;
  updateReview: Review;
  updateRole: Message;
  updateUser: Message;
};


export type MutationAddRoleArgs = {
  data: RoleInput;
};


export type MutationAddReviewArgs = {
  data: ReviewCreateInput;
};


export type MutationCreateCategoryArgs = {
  data: CategoryCreateInput;
};


export type MutationCreateCityArgs = {
  data: CityCreateInput;
};


export type MutationCreatePoiArgs = {
  data: PoiCreateInput;
};


export type MutationDelereRolesArgs = {
  userId: Scalars['String']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCityArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePoiArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  data: UserCreateInput;
};


export type MutationUpdateCategoryArgs = {
  data: CategoryUpdateInput;
};


export type MutationUpdateCityArgs = {
  data: CityUpdateInput;
};


export type MutationUpdatePoiArgs = {
  data: PoiUpdateInput;
};


export type MutationUpdateReviewArgs = {
  data: ReviewUpdateInput;
};


export type MutationUpdateRoleArgs = {
  data: RoleUpdate;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
};

export type Poi = {
  __typename?: 'POI';
  address: Scalars['String']['output'];
  budget: PoiBudget;
  categories: Array<Category>;
  city: City;
  coordinates: PointObject;
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  photos: Array<Scalars['String']['output']>;
  reviews?: Maybe<Array<Review>>;
  slug: Scalars['String']['output'];
};

/** POI's budgets level */
export const enum PoiBudget {
  High = 'HIGH',
  Low = 'LOW',
  Mid = 'MID'
};

export type PoiCreateInput = {
  address: Scalars['String']['input'];
  budget: PoiBudget;
  categoryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  cityId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  gps_coordinates: PointInput;
  name: Scalars['String']['input'];
  photos: Array<Scalars['String']['input']>;
};

export type PoiUpdateInput = {
  address: Scalars['String']['input'];
  budget: PoiBudget;
  categoryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  cityId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  gps_coordinates: PointInput;
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  photos: Array<Scalars['String']['input']>;
};

export type PointInput = {
  coordinates: Array<Scalars['Float']['input']>;
  type?: Scalars['String']['input'];
};

export type PointObject = {
  __typename?: 'PointObject';
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllReviewsByUser: Array<Review>;
  getCategories: Array<Category>;
  getCities: Array<City>;
  getCity: City;
  getPOI: Poi;
  getPOIs: Array<Poi>;
  getReview: Review;
  getUserById: UserWithoutPassword;
  getUsers: Array<UserWithoutPassword>;
  getWebStats: Array<StatsWeb>;
  login: Message;
  logout: Message;
  me?: Maybe<UserWithoutPassword>;
  searchCategories: Array<Category>;
  searchCities: Array<City>;
};


export type QueryGetAllReviewsByUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetCitiesArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetCityArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetPoiArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetPoIsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetReviewArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUsersArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryLoginArgs = {
  data: UserLoginInput;
};


export type QuerySearchCategoriesArgs = {
  text: Scalars['String']['input'];
};


export type QuerySearchCitiesArgs = {
  text: Scalars['String']['input'];
};

export type Review = {
  __typename?: 'Review';
  POI: Poi;
  comment: Scalars['String']['output'];
  date: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  note: Scalars['Float']['output'];
  user: User;
};

export type ReviewCreateInput = {
  POIId: Scalars['UUID']['input'];
  comment: Scalars['String']['input'];
  date: Scalars['DateTimeISO']['input'];
  note: Scalars['Float']['input'];
  userId: Scalars['UUID']['input'];
};

export type ReviewUpdateInput = {
  comment: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
  note: Scalars['Float']['input'];
};

export type Role = {
  __typename?: 'Role';
  city: City;
  id: Scalars['UUID']['output'];
  label: Scalars['String']['output'];
  user: User;
};

export type RoleInput = {
  cityId: Scalars['UUID']['input'];
  label: Scalars['String']['input'];
  userId: Scalars['UUID']['input'];
};

export type RoleUpdate = {
  cityId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
  label: Scalars['String']['input'];
  userId: Scalars['UUID']['input'];
};

export type StatsWeb = {
  __typename?: 'StatsWeb';
  label: Scalars['String']['output'];
  nb: Scalars['Float']['output'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String']['output'];
  cityRole?: Maybe<Array<Role>>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isValid: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  location: Scalars['String']['output'];
  password: Scalars['String']['output'];
  reviews?: Maybe<Array<Review>>;
  role: Scalars['String']['output'];
};

export type UserCreateInput = {
  avatar: Scalars['String']['input'];
  email: Scalars['EmailAddress']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  location: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserLoginInput = {
  email: Scalars['EmailAddress']['input'];
  password: Scalars['String']['input'];
};

export type UserUpdateInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['EmailAddress']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  isValid?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type UserWithoutPassword = {
  __typename?: 'UserWithoutPassword';
  avatar: Scalars['String']['output'];
  cityRole: Array<Role>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isValid: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  location: Scalars['String']['output'];
  reviews: Array<Review>;
  role: Scalars['String']['output'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'UserWithoutPassword', id: string, email: string, firstName: string, lastName: string, location: string, avatar: string, isValid: boolean, role: string, cityRole: Array<{ __typename?: 'Role', id: any, label: string }> } | null };

export type RegisterMutationVariables = Exact<{
  data: UserCreateInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'Message', message: string, success: boolean } };

export type LoginQueryVariables = Exact<{
  data: UserLoginInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'Message', success: boolean, message: string } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: { __typename?: 'Message', success: boolean, message: string } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: any, name: string, icon: string }> };

export type SearchCategoriesQueryVariables = Exact<{
  text: Scalars['String']['input'];
}>;


export type SearchCategoriesQuery = { __typename?: 'Query', searchCategories: Array<{ __typename?: 'Category', id: any, name: string, icon: string }> };

export type CreateCategoryMutationVariables = Exact<{
  data: CategoryCreateInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: any, name: string, icon: string } };

export type UpdateCategoryMutationVariables = Exact<{
  data: CategoryUpdateInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', id: any, name: string, icon: string } };

export type DeleteCategoryMutationVariables = Exact<{
  deleteCategoryId: Scalars['String']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: boolean };

export type GetCitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCitiesQuery = { __typename?: 'Query', getCities: Array<{ __typename?: 'City', id: any, name: string, zip_code: number, slug: string, coordinates: { __typename?: 'PointObject', x: number, y: number } }> };

export type GetCityQueryVariables = Exact<{
  getCityId: Scalars['String']['input'];
}>;


export type GetCityQuery = { __typename?: 'Query', getCity: { __typename?: 'City', id: any, name: string, zip_code: number, slug: string, coordinates: { __typename?: 'PointObject', x: number, y: number } } };

export type SearchCitiesQueryVariables = Exact<{
  text: Scalars['String']['input'];
}>;


export type SearchCitiesQuery = { __typename?: 'Query', searchCities: Array<{ __typename?: 'City', id: any, name: string, slug: string, zip_code: number, coordinates: { __typename?: 'PointObject', x: number, y: number } }> };

export type CreateCityMutationVariables = Exact<{
  data: CityCreateInput;
}>;


export type CreateCityMutation = { __typename?: 'Mutation', createCity: { __typename?: 'City', id: any, name: string, zip_code: number, slug: string, coordinates: { __typename?: 'PointObject', x: number, y: number } } };

export type UpdateCityMutationVariables = Exact<{
  data: CityUpdateInput;
}>;


export type UpdateCityMutation = { __typename?: 'Mutation', updateCity: { __typename?: 'City', id: any, name: string, zip_code: number, slug: string, coordinates: { __typename?: 'PointObject', x: number, y: number } } };

export type DeleteCityMutationVariables = Exact<{
  deleteCityId: Scalars['String']['input'];
}>;


export type DeleteCityMutation = { __typename?: 'Mutation', deleteCity: boolean };

export type GetPoIsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPoIsQuery = { __typename?: 'Query', getPOIs: Array<{ __typename?: 'POI', id: string, name: string, description: string, photos: Array<string>, slug: string, address: string, budget: PoiBudget, coordinates: { __typename?: 'PointObject', x: number, y: number }, city: { __typename?: 'City', id: any, name: string }, categories: Array<{ __typename?: 'Category', id: any, icon: string, name: string }> }> };

export type CreatePoiMutationVariables = Exact<{
  data: PoiCreateInput;
}>;


export type CreatePoiMutation = { __typename?: 'Mutation', createPOI: { __typename?: 'POI', id: string, name: string, description: string, address: string, slug: string, photos: Array<string>, budget: PoiBudget, coordinates: { __typename?: 'PointObject', x: number, y: number }, city: { __typename?: 'City', id: any, name: string }, categories: Array<{ __typename?: 'Category', id: any, icon: string, name: string }> } };

export type UpdatePoiMutationVariables = Exact<{
  data: PoiUpdateInput;
}>;


export type UpdatePoiMutation = { __typename?: 'Mutation', updatePOI: { __typename?: 'POI', id: string, name: string, description: string, photos: Array<string>, slug: string, address: string, budget: PoiBudget, coordinates: { __typename?: 'PointObject', x: number, y: number }, city: { __typename?: 'City', id: any, name: string }, categories: Array<{ __typename?: 'Category', id: any, icon: string, name: string }> } };

export type DeletePoiMutationVariables = Exact<{
  deletePoiId: Scalars['String']['input'];
}>;


export type DeletePoiMutation = { __typename?: 'Mutation', deletePOI: boolean };

export type GetLastUsersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetLastUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'UserWithoutPassword', id: string, email: string, firstName: string, lastName: string, location: string, avatar: string, isValid: boolean, role: string }> };

export type GetWebStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWebStatsQuery = { __typename?: 'Query', getWebStats: Array<{ __typename?: 'StatsWeb', label: string, nb: number }> };


export const MeDocument = gql`
    query Me {
  me {
    id
    email
    firstName
    lastName
    location
    avatar
    isValid
    role
    cityRole {
      id
      label
    }
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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($data: UserCreateInput!) {
  register(data: $data) {
    message
    success
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

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
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    query Login($data: UserLoginInput!) {
  login(data: $data) {
    success
    message
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables> & ({ variables: LoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const LogoutDocument = gql`
    query Logout {
  logout {
    success
    message
  }
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export function useLogoutSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutSuspenseQueryHookResult = ReturnType<typeof useLogoutSuspenseQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    id
    name
    icon
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const SearchCategoriesDocument = gql`
    query SearchCategories($text: String!) {
  searchCategories(text: $text) {
    id
    name
    icon
  }
}
    `;

/**
 * __useSearchCategoriesQuery__
 *
 * To run a query within a React component, call `useSearchCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCategoriesQuery({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useSearchCategoriesQuery(baseOptions: Apollo.QueryHookOptions<SearchCategoriesQuery, SearchCategoriesQueryVariables> & ({ variables: SearchCategoriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCategoriesQuery, SearchCategoriesQueryVariables>(SearchCategoriesDocument, options);
      }
export function useSearchCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCategoriesQuery, SearchCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCategoriesQuery, SearchCategoriesQueryVariables>(SearchCategoriesDocument, options);
        }
export function useSearchCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchCategoriesQuery, SearchCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchCategoriesQuery, SearchCategoriesQueryVariables>(SearchCategoriesDocument, options);
        }
export type SearchCategoriesQueryHookResult = ReturnType<typeof useSearchCategoriesQuery>;
export type SearchCategoriesLazyQueryHookResult = ReturnType<typeof useSearchCategoriesLazyQuery>;
export type SearchCategoriesSuspenseQueryHookResult = ReturnType<typeof useSearchCategoriesSuspenseQuery>;
export type SearchCategoriesQueryResult = Apollo.QueryResult<SearchCategoriesQuery, SearchCategoriesQueryVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($data: CategoryCreateInput!) {
  createCategory(data: $data) {
    id
    name
    icon
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($data: CategoryUpdateInput!) {
  updateCategory(data: $data) {
    id
    name
    icon
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($deleteCategoryId: String!) {
  deleteCategory(id: $deleteCategoryId)
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      deleteCategoryId: // value for 'deleteCategoryId'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const GetCitiesDocument = gql`
    query GetCities {
  getCities {
    id
    name
    coordinates {
      x
      y
    }
    zip_code
    slug
  }
}
    `;

/**
 * __useGetCitiesQuery__
 *
 * To run a query within a React component, call `useGetCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
      }
export function useGetCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
        }
export function useGetCitiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
        }
export type GetCitiesQueryHookResult = ReturnType<typeof useGetCitiesQuery>;
export type GetCitiesLazyQueryHookResult = ReturnType<typeof useGetCitiesLazyQuery>;
export type GetCitiesSuspenseQueryHookResult = ReturnType<typeof useGetCitiesSuspenseQuery>;
export type GetCitiesQueryResult = Apollo.QueryResult<GetCitiesQuery, GetCitiesQueryVariables>;
export const GetCityDocument = gql`
    query GetCity($getCityId: String!) {
  getCity(id: $getCityId) {
    id
    name
    coordinates {
      x
      y
    }
    zip_code
    slug
  }
}
    `;

/**
 * __useGetCityQuery__
 *
 * To run a query within a React component, call `useGetCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCityQuery({
 *   variables: {
 *      getCityId: // value for 'getCityId'
 *   },
 * });
 */
export function useGetCityQuery(baseOptions: Apollo.QueryHookOptions<GetCityQuery, GetCityQueryVariables> & ({ variables: GetCityQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCityQuery, GetCityQueryVariables>(GetCityDocument, options);
      }
export function useGetCityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCityQuery, GetCityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCityQuery, GetCityQueryVariables>(GetCityDocument, options);
        }
export function useGetCitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCityQuery, GetCityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCityQuery, GetCityQueryVariables>(GetCityDocument, options);
        }
export type GetCityQueryHookResult = ReturnType<typeof useGetCityQuery>;
export type GetCityLazyQueryHookResult = ReturnType<typeof useGetCityLazyQuery>;
export type GetCitySuspenseQueryHookResult = ReturnType<typeof useGetCitySuspenseQuery>;
export type GetCityQueryResult = Apollo.QueryResult<GetCityQuery, GetCityQueryVariables>;
export const SearchCitiesDocument = gql`
    query SearchCities($text: String!) {
  searchCities(text: $text) {
    id
    name
    slug
    zip_code
    coordinates {
      x
      y
    }
  }
}
    `;

/**
 * __useSearchCitiesQuery__
 *
 * To run a query within a React component, call `useSearchCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCitiesQuery({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useSearchCitiesQuery(baseOptions: Apollo.QueryHookOptions<SearchCitiesQuery, SearchCitiesQueryVariables> & ({ variables: SearchCitiesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCitiesQuery, SearchCitiesQueryVariables>(SearchCitiesDocument, options);
      }
export function useSearchCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCitiesQuery, SearchCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCitiesQuery, SearchCitiesQueryVariables>(SearchCitiesDocument, options);
        }
export function useSearchCitiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchCitiesQuery, SearchCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchCitiesQuery, SearchCitiesQueryVariables>(SearchCitiesDocument, options);
        }
export type SearchCitiesQueryHookResult = ReturnType<typeof useSearchCitiesQuery>;
export type SearchCitiesLazyQueryHookResult = ReturnType<typeof useSearchCitiesLazyQuery>;
export type SearchCitiesSuspenseQueryHookResult = ReturnType<typeof useSearchCitiesSuspenseQuery>;
export type SearchCitiesQueryResult = Apollo.QueryResult<SearchCitiesQuery, SearchCitiesQueryVariables>;
export const CreateCityDocument = gql`
    mutation CreateCity($data: CityCreateInput!) {
  createCity(data: $data) {
    id
    name
    coordinates {
      x
      y
    }
    zip_code
    slug
  }
}
    `;
export type CreateCityMutationFn = Apollo.MutationFunction<CreateCityMutation, CreateCityMutationVariables>;

/**
 * __useCreateCityMutation__
 *
 * To run a mutation, you first call `useCreateCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCityMutation, { data, loading, error }] = useCreateCityMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCityMutation(baseOptions?: Apollo.MutationHookOptions<CreateCityMutation, CreateCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCityMutation, CreateCityMutationVariables>(CreateCityDocument, options);
      }
export type CreateCityMutationHookResult = ReturnType<typeof useCreateCityMutation>;
export type CreateCityMutationResult = Apollo.MutationResult<CreateCityMutation>;
export type CreateCityMutationOptions = Apollo.BaseMutationOptions<CreateCityMutation, CreateCityMutationVariables>;
export const UpdateCityDocument = gql`
    mutation UpdateCity($data: CityUpdateInput!) {
  updateCity(data: $data) {
    id
    name
    coordinates {
      x
      y
    }
    zip_code
    slug
  }
}
    `;
export type UpdateCityMutationFn = Apollo.MutationFunction<UpdateCityMutation, UpdateCityMutationVariables>;

/**
 * __useUpdateCityMutation__
 *
 * To run a mutation, you first call `useUpdateCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCityMutation, { data, loading, error }] = useUpdateCityMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCityMutation, UpdateCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCityMutation, UpdateCityMutationVariables>(UpdateCityDocument, options);
      }
export type UpdateCityMutationHookResult = ReturnType<typeof useUpdateCityMutation>;
export type UpdateCityMutationResult = Apollo.MutationResult<UpdateCityMutation>;
export type UpdateCityMutationOptions = Apollo.BaseMutationOptions<UpdateCityMutation, UpdateCityMutationVariables>;
export const DeleteCityDocument = gql`
    mutation DeleteCity($deleteCityId: String!) {
  deleteCity(id: $deleteCityId)
}
    `;
export type DeleteCityMutationFn = Apollo.MutationFunction<DeleteCityMutation, DeleteCityMutationVariables>;

/**
 * __useDeleteCityMutation__
 *
 * To run a mutation, you first call `useDeleteCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCityMutation, { data, loading, error }] = useDeleteCityMutation({
 *   variables: {
 *      deleteCityId: // value for 'deleteCityId'
 *   },
 * });
 */
export function useDeleteCityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCityMutation, DeleteCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCityMutation, DeleteCityMutationVariables>(DeleteCityDocument, options);
      }
export type DeleteCityMutationHookResult = ReturnType<typeof useDeleteCityMutation>;
export type DeleteCityMutationResult = Apollo.MutationResult<DeleteCityMutation>;
export type DeleteCityMutationOptions = Apollo.BaseMutationOptions<DeleteCityMutation, DeleteCityMutationVariables>;
export const GetPoIsDocument = gql`
    query GetPOIs {
  getPOIs {
    id
    name
    description
    photos
    slug
    coordinates {
      x
      y
    }
    address
    budget
    city {
      id
      name
    }
    categories {
      id
      icon
      name
    }
  }
}
    `;

/**
 * __useGetPoIsQuery__
 *
 * To run a query within a React component, call `useGetPoIsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoIsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoIsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPoIsQuery(baseOptions?: Apollo.QueryHookOptions<GetPoIsQuery, GetPoIsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPoIsQuery, GetPoIsQueryVariables>(GetPoIsDocument, options);
      }
export function useGetPoIsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPoIsQuery, GetPoIsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPoIsQuery, GetPoIsQueryVariables>(GetPoIsDocument, options);
        }
export function useGetPoIsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPoIsQuery, GetPoIsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPoIsQuery, GetPoIsQueryVariables>(GetPoIsDocument, options);
        }
export type GetPoIsQueryHookResult = ReturnType<typeof useGetPoIsQuery>;
export type GetPoIsLazyQueryHookResult = ReturnType<typeof useGetPoIsLazyQuery>;
export type GetPoIsSuspenseQueryHookResult = ReturnType<typeof useGetPoIsSuspenseQuery>;
export type GetPoIsQueryResult = Apollo.QueryResult<GetPoIsQuery, GetPoIsQueryVariables>;
export const CreatePoiDocument = gql`
    mutation CreatePOI($data: POICreateInput!) {
  createPOI(data: $data) {
    id
    name
    description
    address
    slug
    photos
    coordinates {
      x
      y
    }
    city {
      id
      name
    }
    categories {
      id
      icon
      name
    }
    budget
  }
}
    `;
export type CreatePoiMutationFn = Apollo.MutationFunction<CreatePoiMutation, CreatePoiMutationVariables>;

/**
 * __useCreatePoiMutation__
 *
 * To run a mutation, you first call `useCreatePoiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePoiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPoiMutation, { data, loading, error }] = useCreatePoiMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePoiMutation(baseOptions?: Apollo.MutationHookOptions<CreatePoiMutation, CreatePoiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePoiMutation, CreatePoiMutationVariables>(CreatePoiDocument, options);
      }
export type CreatePoiMutationHookResult = ReturnType<typeof useCreatePoiMutation>;
export type CreatePoiMutationResult = Apollo.MutationResult<CreatePoiMutation>;
export type CreatePoiMutationOptions = Apollo.BaseMutationOptions<CreatePoiMutation, CreatePoiMutationVariables>;
export const UpdatePoiDocument = gql`
    mutation UpdatePOI($data: POIUpdateInput!) {
  updatePOI(data: $data) {
    id
    name
    description
    photos
    slug
    coordinates {
      x
      y
    }
    address
    budget
    city {
      id
      name
    }
    categories {
      id
      icon
      name
    }
  }
}
    `;
export type UpdatePoiMutationFn = Apollo.MutationFunction<UpdatePoiMutation, UpdatePoiMutationVariables>;

/**
 * __useUpdatePoiMutation__
 *
 * To run a mutation, you first call `useUpdatePoiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePoiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePoiMutation, { data, loading, error }] = useUpdatePoiMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePoiMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePoiMutation, UpdatePoiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePoiMutation, UpdatePoiMutationVariables>(UpdatePoiDocument, options);
      }
export type UpdatePoiMutationHookResult = ReturnType<typeof useUpdatePoiMutation>;
export type UpdatePoiMutationResult = Apollo.MutationResult<UpdatePoiMutation>;
export type UpdatePoiMutationOptions = Apollo.BaseMutationOptions<UpdatePoiMutation, UpdatePoiMutationVariables>;
export const DeletePoiDocument = gql`
    mutation DeletePOI($deletePoiId: String!) {
  deletePOI(id: $deletePoiId)
}
    `;
export type DeletePoiMutationFn = Apollo.MutationFunction<DeletePoiMutation, DeletePoiMutationVariables>;

/**
 * __useDeletePoiMutation__
 *
 * To run a mutation, you first call `useDeletePoiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePoiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePoiMutation, { data, loading, error }] = useDeletePoiMutation({
 *   variables: {
 *      deletePoiId: // value for 'deletePoiId'
 *   },
 * });
 */
export function useDeletePoiMutation(baseOptions?: Apollo.MutationHookOptions<DeletePoiMutation, DeletePoiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePoiMutation, DeletePoiMutationVariables>(DeletePoiDocument, options);
      }
export type DeletePoiMutationHookResult = ReturnType<typeof useDeletePoiMutation>;
export type DeletePoiMutationResult = Apollo.MutationResult<DeletePoiMutation>;
export type DeletePoiMutationOptions = Apollo.BaseMutationOptions<DeletePoiMutation, DeletePoiMutationVariables>;
export const GetLastUsersDocument = gql`
    query GetLastUsers($limit: Float) {
  getUsers(limit: $limit) {
    id
    email
    firstName
    lastName
    location
    avatar
    isValid
    role
  }
}
    `;

/**
 * __useGetLastUsersQuery__
 *
 * To run a query within a React component, call `useGetLastUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetLastUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetLastUsersQuery, GetLastUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLastUsersQuery, GetLastUsersQueryVariables>(GetLastUsersDocument, options);
      }
export function useGetLastUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLastUsersQuery, GetLastUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLastUsersQuery, GetLastUsersQueryVariables>(GetLastUsersDocument, options);
        }
export function useGetLastUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetLastUsersQuery, GetLastUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLastUsersQuery, GetLastUsersQueryVariables>(GetLastUsersDocument, options);
        }
export type GetLastUsersQueryHookResult = ReturnType<typeof useGetLastUsersQuery>;
export type GetLastUsersLazyQueryHookResult = ReturnType<typeof useGetLastUsersLazyQuery>;
export type GetLastUsersSuspenseQueryHookResult = ReturnType<typeof useGetLastUsersSuspenseQuery>;
export type GetLastUsersQueryResult = Apollo.QueryResult<GetLastUsersQuery, GetLastUsersQueryVariables>;
export const GetWebStatsDocument = gql`
    query GetWebStats {
  getWebStats {
    label
    nb
  }
}
    `;

/**
 * __useGetWebStatsQuery__
 *
 * To run a query within a React component, call `useGetWebStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWebStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWebStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWebStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetWebStatsQuery, GetWebStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWebStatsQuery, GetWebStatsQueryVariables>(GetWebStatsDocument, options);
      }
export function useGetWebStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWebStatsQuery, GetWebStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWebStatsQuery, GetWebStatsQueryVariables>(GetWebStatsDocument, options);
        }
export function useGetWebStatsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetWebStatsQuery, GetWebStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWebStatsQuery, GetWebStatsQueryVariables>(GetWebStatsDocument, options);
        }
export type GetWebStatsQueryHookResult = ReturnType<typeof useGetWebStatsQuery>;
export type GetWebStatsLazyQueryHookResult = ReturnType<typeof useGetWebStatsLazyQuery>;
export type GetWebStatsSuspenseQueryHookResult = ReturnType<typeof useGetWebStatsSuspenseQuery>;
export type GetWebStatsQueryResult = Apollo.QueryResult<GetWebStatsQuery, GetWebStatsQueryVariables>;