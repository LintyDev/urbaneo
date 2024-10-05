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

export type CityWithPoi = {
  __typename?: 'CityWithPOI';
  coordinates: PointObject;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  pois: Array<Poi>;
  slug: Scalars['String']['output'];
  zip_code: Scalars['Float']['output'];
};

export type InputSearchCity = {
  budget?: InputMaybe<PoiBudget>;
  categoriesId?: InputMaybe<Array<Scalars['String']['input']>>;
  slug: Scalars['String']['input'];
};

/** User's access levels and permissions for cities */
export const enum Label {
  CityAdmin = 'CITY_ADMIN',
  CityModerator = 'CITY_MODERATOR'
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
  deleteCategory: Scalars['Boolean']['output'];
  deleteCity: Scalars['Boolean']['output'];
  deletePOI: Scalars['Boolean']['output'];
  deleteReview: Message;
  deleteRoles: Message;
  deleteUser: Message;
  editPassword: Scalars['Boolean']['output'];
  editUser: UserWithoutPassword;
  register: Message;
  selfDelete: Scalars['Boolean']['output'];
  updateCategory: Category;
  updateCity: City;
  updatePOI: Poi;
  updateReview: Review;
  updateRole: Message;
  updateUser: UserWithoutPassword;
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


export type MutationDeleteRolesArgs = {
  data: RoleInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationEditPasswordArgs = {
  password: Scalars['String']['input'];
};


export type MutationEditUserArgs = {
  data: UserEditInput;
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
  averageNote?: Maybe<Scalars['Float']['output']>;
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
  checkPassword: Scalars['Boolean']['output'];
  getAllReviewsByUser: Array<Review>;
  getCategories: Array<Category>;
  getCities: Array<City>;
  getCity: City;
  getCityFromSearch: CityWithPoi;
  getPOI: Poi;
  getPOIs: Array<Poi>;
  getPOIsBySlug: Array<Poi>;
  getReview: Review;
  getReviewsByPOISlug: Array<Review>;
  getUserById: UserWithoutPassword;
  getUsers: Array<UserWithoutPassword>;
  getWebStats: Array<StatsWeb>;
  login: Message;
  logout: Message;
  me?: Maybe<UserWithoutPassword>;
  searchCategories: Array<Category>;
  searchCities: Array<City>;
};


export type QueryCheckPasswordArgs = {
  data: UserLoginInput;
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


export type QueryGetCityFromSearchArgs = {
  data: InputSearchCity;
};


export type QueryGetPoiArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetPoIsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetPoIsBySlugArgs = {
  slug: Array<Scalars['String']['input']>;
};


export type QueryGetReviewArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetReviewsByPoiSlugArgs = {
  slug: Scalars['String']['input'];
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
  label: Label;
  user: User;
};

export type RoleInput = {
  cityId: Scalars['UUID']['input'];
  label: Label;
  userId: Scalars['UUID']['input'];
};

export type RoleUpdate = {
  cityId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
  label: Label;
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
  role: UserRole;
};

export type UserCreateInput = {
  avatar: Scalars['String']['input'];
  email: Scalars['EmailAddress']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  location: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserEditInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['EmailAddress']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
};

export type UserLoginInput = {
  email: Scalars['EmailAddress']['input'];
  password: Scalars['String']['input'];
};

/** User's access levels and permissions */
export const enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  UserPremium = 'USER_PREMIUM'
};

export type UserUpdateInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['EmailAddress']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  isValid?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
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
  role: UserRole;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'UserWithoutPassword', id: string, email: string, firstName: string, lastName: string, location: string, avatar: string, isValid: boolean, role: UserRole, cityRole: Array<{ __typename?: 'Role', id: any, label: Label }> } | null };

export type MyAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type MyAccountQuery = { __typename?: 'Query', me?: { __typename?: 'UserWithoutPassword', id: string, email: string, firstName: string, lastName: string, location: string, avatar: string, isValid: boolean, role: UserRole, cityRole: Array<{ __typename?: 'Role', label: Label, city: { __typename?: 'City', name: string } }>, reviews: Array<{ __typename?: 'Review', date: any, comment: string, note: number, id: string, POI: { __typename?: 'POI', name: string, slug: string } }> } | null };

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

export type GetCityFromSearchQueryVariables = Exact<{
  data: InputSearchCity;
}>;


export type GetCityFromSearchQuery = { __typename?: 'Query', getCityFromSearch: { __typename?: 'CityWithPOI', id: any, name: string, zip_code: number, slug: string, coordinates: { __typename?: 'PointObject', x: number, y: number }, pois: Array<{ __typename?: 'POI', id: string, name: string, photos: Array<string>, slug: string, address: string, budget: PoiBudget, coordinates: { __typename?: 'PointObject', x: number, y: number }, categories: Array<{ __typename?: 'Category', icon: string }> }> } };

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

export type AddRoleMutationVariables = Exact<{
  data: RoleInput;
}>;


export type AddRoleMutation = { __typename?: 'Mutation', AddRole: { __typename?: 'Message', message: string, success: boolean } };

export type DeleteRolesMutationVariables = Exact<{
  data: RoleInput;
}>;


export type DeleteRolesMutation = { __typename?: 'Mutation', deleteRoles: { __typename?: 'Message', message: string, success: boolean } };

export type GetPoIsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPoIsQuery = { __typename?: 'Query', getPOIs: Array<{ __typename?: 'POI', id: string, name: string, description: string, photos: Array<string>, slug: string, address: string, budget: PoiBudget, coordinates: { __typename?: 'PointObject', x: number, y: number }, city: { __typename?: 'City', id: any, name: string }, categories: Array<{ __typename?: 'Category', id: any, icon: string, name: string }> }> };

export type GetPoIsBySlugQueryVariables = Exact<{
  slug: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type GetPoIsBySlugQuery = { __typename?: 'Query', getPOIsBySlug: Array<{ __typename?: 'POI', name: string, description: string, photos: Array<string>, slug: string, budget: PoiBudget, averageNote?: number | null, city: { __typename?: 'City', name: string }, categories: Array<{ __typename?: 'Category', icon: string }> }> };

export type GetPoIsBySlugDiscoverQueryVariables = Exact<{
  slug: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type GetPoIsBySlugDiscoverQuery = { __typename?: 'Query', getPOIsBySlug: Array<{ __typename?: 'POI', id: string, name: string, description: string, photos: Array<string>, slug: string, budget: PoiBudget, address: string, averageNote?: number | null, city: { __typename?: 'City', name: string }, categories: Array<{ __typename?: 'Category', icon: string, name: string }> }> };

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

export type GetReviewsByPoiSlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetReviewsByPoiSlugQuery = { __typename?: 'Query', getReviewsByPOISlug: Array<{ __typename?: 'Review', id: string, note: number, comment: string, date: any, user: { __typename?: 'User', firstName: string, avatar: string } }> };

export type AddReviewMutationVariables = Exact<{
  data: ReviewCreateInput;
}>;


export type AddReviewMutation = { __typename?: 'Mutation', addReview: { __typename?: 'Review', id: string } };

export type GetLastUsersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetLastUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'UserWithoutPassword', id: string, email: string, firstName: string, lastName: string, location: string, avatar: string, isValid: boolean, role: UserRole }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'UserWithoutPassword', id: string, email: string, firstName: string, lastName: string, location: string, avatar: string, isValid: boolean, role: UserRole, cityRole: Array<{ __typename?: 'Role', label: Label, id: any, city: { __typename?: 'City', name: string, id: any } }> }> };

export type CheckPasswordQueryVariables = Exact<{
  data: UserLoginInput;
}>;


export type CheckPasswordQuery = { __typename?: 'Query', checkPassword: boolean };

export type UpdateUserMutationVariables = Exact<{
  data: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserWithoutPassword', id: string, email: string, firstName: string, lastName: string, location: string, avatar: string, isValid: boolean, role: UserRole, cityRole: Array<{ __typename?: 'Role', id: any, label: Label, city: { __typename?: 'City', id: any, name: string } }> } };

export type EditUserMutationVariables = Exact<{
  data: UserEditInput;
}>;


export type EditUserMutation = { __typename?: 'Mutation', editUser: { __typename?: 'UserWithoutPassword', id: string, email: string, firstName: string, lastName: string, location: string, avatar: string, isValid: boolean, role: UserRole, cityRole: Array<{ __typename?: 'Role', label: Label, city: { __typename?: 'City', name: string } }>, reviews: Array<{ __typename?: 'Review', date: any, comment: string, note: number, id: string, POI: { __typename?: 'POI', name: string, slug: string } }> } };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['String']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'Message', success: boolean, message: string } };

export type EditPasswordMutationVariables = Exact<{
  password: Scalars['String']['input'];
}>;


export type EditPasswordMutation = { __typename?: 'Mutation', editPassword: boolean };

export type SelfDeleteMutationVariables = Exact<{ [key: string]: never; }>;


export type SelfDeleteMutation = { __typename?: 'Mutation', selfDelete: boolean };

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
export const MyAccountDocument = gql`
    query MyAccount {
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
      label
      city {
        name
      }
    }
    reviews {
      POI {
        name
        slug
      }
      date
      comment
      note
      id
    }
  }
}
    `;

/**
 * __useMyAccountQuery__
 *
 * To run a query within a React component, call `useMyAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyAccountQuery(baseOptions?: Apollo.QueryHookOptions<MyAccountQuery, MyAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyAccountQuery, MyAccountQueryVariables>(MyAccountDocument, options);
      }
export function useMyAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyAccountQuery, MyAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyAccountQuery, MyAccountQueryVariables>(MyAccountDocument, options);
        }
export function useMyAccountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MyAccountQuery, MyAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyAccountQuery, MyAccountQueryVariables>(MyAccountDocument, options);
        }
export type MyAccountQueryHookResult = ReturnType<typeof useMyAccountQuery>;
export type MyAccountLazyQueryHookResult = ReturnType<typeof useMyAccountLazyQuery>;
export type MyAccountSuspenseQueryHookResult = ReturnType<typeof useMyAccountSuspenseQuery>;
export type MyAccountQueryResult = Apollo.QueryResult<MyAccountQuery, MyAccountQueryVariables>;
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
export const GetCityFromSearchDocument = gql`
    query GetCityFromSearch($data: InputSearchCity!) {
  getCityFromSearch(data: $data) {
    id
    name
    coordinates {
      x
      y
    }
    zip_code
    slug
    pois {
      id
      name
      photos
      slug
      coordinates {
        x
        y
      }
      address
      budget
      categories {
        icon
      }
    }
  }
}
    `;

/**
 * __useGetCityFromSearchQuery__
 *
 * To run a query within a React component, call `useGetCityFromSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCityFromSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCityFromSearchQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetCityFromSearchQuery(baseOptions: Apollo.QueryHookOptions<GetCityFromSearchQuery, GetCityFromSearchQueryVariables> & ({ variables: GetCityFromSearchQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCityFromSearchQuery, GetCityFromSearchQueryVariables>(GetCityFromSearchDocument, options);
      }
export function useGetCityFromSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCityFromSearchQuery, GetCityFromSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCityFromSearchQuery, GetCityFromSearchQueryVariables>(GetCityFromSearchDocument, options);
        }
export function useGetCityFromSearchSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCityFromSearchQuery, GetCityFromSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCityFromSearchQuery, GetCityFromSearchQueryVariables>(GetCityFromSearchDocument, options);
        }
export type GetCityFromSearchQueryHookResult = ReturnType<typeof useGetCityFromSearchQuery>;
export type GetCityFromSearchLazyQueryHookResult = ReturnType<typeof useGetCityFromSearchLazyQuery>;
export type GetCityFromSearchSuspenseQueryHookResult = ReturnType<typeof useGetCityFromSearchSuspenseQuery>;
export type GetCityFromSearchQueryResult = Apollo.QueryResult<GetCityFromSearchQuery, GetCityFromSearchQueryVariables>;
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
export const AddRoleDocument = gql`
    mutation AddRole($data: RoleInput!) {
  AddRole(data: $data) {
    message
    success
  }
}
    `;
export type AddRoleMutationFn = Apollo.MutationFunction<AddRoleMutation, AddRoleMutationVariables>;

/**
 * __useAddRoleMutation__
 *
 * To run a mutation, you first call `useAddRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRoleMutation, { data, loading, error }] = useAddRoleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddRoleMutation(baseOptions?: Apollo.MutationHookOptions<AddRoleMutation, AddRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddRoleMutation, AddRoleMutationVariables>(AddRoleDocument, options);
      }
export type AddRoleMutationHookResult = ReturnType<typeof useAddRoleMutation>;
export type AddRoleMutationResult = Apollo.MutationResult<AddRoleMutation>;
export type AddRoleMutationOptions = Apollo.BaseMutationOptions<AddRoleMutation, AddRoleMutationVariables>;
export const DeleteRolesDocument = gql`
    mutation DeleteRoles($data: RoleInput!) {
  deleteRoles(data: $data) {
    message
    success
  }
}
    `;
export type DeleteRolesMutationFn = Apollo.MutationFunction<DeleteRolesMutation, DeleteRolesMutationVariables>;

/**
 * __useDeleteRolesMutation__
 *
 * To run a mutation, you first call `useDeleteRolesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRolesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRolesMutation, { data, loading, error }] = useDeleteRolesMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteRolesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRolesMutation, DeleteRolesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRolesMutation, DeleteRolesMutationVariables>(DeleteRolesDocument, options);
      }
export type DeleteRolesMutationHookResult = ReturnType<typeof useDeleteRolesMutation>;
export type DeleteRolesMutationResult = Apollo.MutationResult<DeleteRolesMutation>;
export type DeleteRolesMutationOptions = Apollo.BaseMutationOptions<DeleteRolesMutation, DeleteRolesMutationVariables>;
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
export const GetPoIsBySlugDocument = gql`
    query GetPOIsBySlug($slug: [String!]!) {
  getPOIsBySlug(slug: $slug) {
    name
    description
    photos
    slug
    budget
    city {
      name
    }
    categories {
      icon
    }
    averageNote
  }
}
    `;

/**
 * __useGetPoIsBySlugQuery__
 *
 * To run a query within a React component, call `useGetPoIsBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoIsBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoIsBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetPoIsBySlugQuery(baseOptions: Apollo.QueryHookOptions<GetPoIsBySlugQuery, GetPoIsBySlugQueryVariables> & ({ variables: GetPoIsBySlugQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPoIsBySlugQuery, GetPoIsBySlugQueryVariables>(GetPoIsBySlugDocument, options);
      }
export function useGetPoIsBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPoIsBySlugQuery, GetPoIsBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPoIsBySlugQuery, GetPoIsBySlugQueryVariables>(GetPoIsBySlugDocument, options);
        }
export function useGetPoIsBySlugSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPoIsBySlugQuery, GetPoIsBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPoIsBySlugQuery, GetPoIsBySlugQueryVariables>(GetPoIsBySlugDocument, options);
        }
export type GetPoIsBySlugQueryHookResult = ReturnType<typeof useGetPoIsBySlugQuery>;
export type GetPoIsBySlugLazyQueryHookResult = ReturnType<typeof useGetPoIsBySlugLazyQuery>;
export type GetPoIsBySlugSuspenseQueryHookResult = ReturnType<typeof useGetPoIsBySlugSuspenseQuery>;
export type GetPoIsBySlugQueryResult = Apollo.QueryResult<GetPoIsBySlugQuery, GetPoIsBySlugQueryVariables>;
export const GetPoIsBySlugDiscoverDocument = gql`
    query GetPOIsBySlugDiscover($slug: [String!]!) {
  getPOIsBySlug(slug: $slug) {
    id
    name
    description
    photos
    slug
    budget
    city {
      name
    }
    categories {
      icon
      name
    }
    address
    averageNote
  }
}
    `;

/**
 * __useGetPoIsBySlugDiscoverQuery__
 *
 * To run a query within a React component, call `useGetPoIsBySlugDiscoverQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoIsBySlugDiscoverQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoIsBySlugDiscoverQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetPoIsBySlugDiscoverQuery(baseOptions: Apollo.QueryHookOptions<GetPoIsBySlugDiscoverQuery, GetPoIsBySlugDiscoverQueryVariables> & ({ variables: GetPoIsBySlugDiscoverQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPoIsBySlugDiscoverQuery, GetPoIsBySlugDiscoverQueryVariables>(GetPoIsBySlugDiscoverDocument, options);
      }
export function useGetPoIsBySlugDiscoverLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPoIsBySlugDiscoverQuery, GetPoIsBySlugDiscoverQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPoIsBySlugDiscoverQuery, GetPoIsBySlugDiscoverQueryVariables>(GetPoIsBySlugDiscoverDocument, options);
        }
export function useGetPoIsBySlugDiscoverSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPoIsBySlugDiscoverQuery, GetPoIsBySlugDiscoverQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPoIsBySlugDiscoverQuery, GetPoIsBySlugDiscoverQueryVariables>(GetPoIsBySlugDiscoverDocument, options);
        }
export type GetPoIsBySlugDiscoverQueryHookResult = ReturnType<typeof useGetPoIsBySlugDiscoverQuery>;
export type GetPoIsBySlugDiscoverLazyQueryHookResult = ReturnType<typeof useGetPoIsBySlugDiscoverLazyQuery>;
export type GetPoIsBySlugDiscoverSuspenseQueryHookResult = ReturnType<typeof useGetPoIsBySlugDiscoverSuspenseQuery>;
export type GetPoIsBySlugDiscoverQueryResult = Apollo.QueryResult<GetPoIsBySlugDiscoverQuery, GetPoIsBySlugDiscoverQueryVariables>;
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
export const GetReviewsByPoiSlugDocument = gql`
    query GetReviewsByPOISlug($slug: String!) {
  getReviewsByPOISlug(slug: $slug) {
    id
    note
    comment
    date
    user {
      firstName
      avatar
    }
  }
}
    `;

/**
 * __useGetReviewsByPoiSlugQuery__
 *
 * To run a query within a React component, call `useGetReviewsByPoiSlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewsByPoiSlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewsByPoiSlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetReviewsByPoiSlugQuery(baseOptions: Apollo.QueryHookOptions<GetReviewsByPoiSlugQuery, GetReviewsByPoiSlugQueryVariables> & ({ variables: GetReviewsByPoiSlugQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReviewsByPoiSlugQuery, GetReviewsByPoiSlugQueryVariables>(GetReviewsByPoiSlugDocument, options);
      }
export function useGetReviewsByPoiSlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewsByPoiSlugQuery, GetReviewsByPoiSlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReviewsByPoiSlugQuery, GetReviewsByPoiSlugQueryVariables>(GetReviewsByPoiSlugDocument, options);
        }
export function useGetReviewsByPoiSlugSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetReviewsByPoiSlugQuery, GetReviewsByPoiSlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReviewsByPoiSlugQuery, GetReviewsByPoiSlugQueryVariables>(GetReviewsByPoiSlugDocument, options);
        }
export type GetReviewsByPoiSlugQueryHookResult = ReturnType<typeof useGetReviewsByPoiSlugQuery>;
export type GetReviewsByPoiSlugLazyQueryHookResult = ReturnType<typeof useGetReviewsByPoiSlugLazyQuery>;
export type GetReviewsByPoiSlugSuspenseQueryHookResult = ReturnType<typeof useGetReviewsByPoiSlugSuspenseQuery>;
export type GetReviewsByPoiSlugQueryResult = Apollo.QueryResult<GetReviewsByPoiSlugQuery, GetReviewsByPoiSlugQueryVariables>;
export const AddReviewDocument = gql`
    mutation AddReview($data: ReviewCreateInput!) {
  addReview(data: $data) {
    id
  }
}
    `;
export type AddReviewMutationFn = Apollo.MutationFunction<AddReviewMutation, AddReviewMutationVariables>;

/**
 * __useAddReviewMutation__
 *
 * To run a mutation, you first call `useAddReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReviewMutation, { data, loading, error }] = useAddReviewMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddReviewMutation(baseOptions?: Apollo.MutationHookOptions<AddReviewMutation, AddReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddReviewMutation, AddReviewMutationVariables>(AddReviewDocument, options);
      }
export type AddReviewMutationHookResult = ReturnType<typeof useAddReviewMutation>;
export type AddReviewMutationResult = Apollo.MutationResult<AddReviewMutation>;
export type AddReviewMutationOptions = Apollo.BaseMutationOptions<AddReviewMutation, AddReviewMutationVariables>;
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
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    email
    firstName
    lastName
    location
    avatar
    isValid
    role
    cityRole {
      city {
        name
        id
      }
      label
      id
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const CheckPasswordDocument = gql`
    query checkPassword($data: UserLoginInput!) {
  checkPassword(data: $data)
}
    `;

/**
 * __useCheckPasswordQuery__
 *
 * To run a query within a React component, call `useCheckPasswordQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckPasswordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckPasswordQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCheckPasswordQuery(baseOptions: Apollo.QueryHookOptions<CheckPasswordQuery, CheckPasswordQueryVariables> & ({ variables: CheckPasswordQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckPasswordQuery, CheckPasswordQueryVariables>(CheckPasswordDocument, options);
      }
export function useCheckPasswordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckPasswordQuery, CheckPasswordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckPasswordQuery, CheckPasswordQueryVariables>(CheckPasswordDocument, options);
        }
export function useCheckPasswordSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CheckPasswordQuery, CheckPasswordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckPasswordQuery, CheckPasswordQueryVariables>(CheckPasswordDocument, options);
        }
export type CheckPasswordQueryHookResult = ReturnType<typeof useCheckPasswordQuery>;
export type CheckPasswordLazyQueryHookResult = ReturnType<typeof useCheckPasswordLazyQuery>;
export type CheckPasswordSuspenseQueryHookResult = ReturnType<typeof useCheckPasswordSuspenseQuery>;
export type CheckPasswordQueryResult = Apollo.QueryResult<CheckPasswordQuery, CheckPasswordQueryVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: UserUpdateInput!) {
  updateUser(data: $data) {
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
      city {
        id
        name
      }
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const EditUserDocument = gql`
    mutation EditUser($data: UserEditInput!) {
  editUser(data: $data) {
    id
    email
    firstName
    lastName
    location
    avatar
    isValid
    role
    cityRole {
      label
      city {
        name
      }
    }
    reviews {
      POI {
        name
        slug
      }
      date
      comment
      note
      id
    }
  }
}
    `;
export type EditUserMutationFn = Apollo.MutationFunction<EditUserMutation, EditUserMutationVariables>;

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditUserMutation(baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument, options);
      }
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<EditUserMutation, EditUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($deleteUserId: String!) {
  deleteUser(id: $deleteUserId) {
    success
    message
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      deleteUserId: // value for 'deleteUserId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const EditPasswordDocument = gql`
    mutation EditPassword($password: String!) {
  editPassword(password: $password)
}
    `;
export type EditPasswordMutationFn = Apollo.MutationFunction<EditPasswordMutation, EditPasswordMutationVariables>;

/**
 * __useEditPasswordMutation__
 *
 * To run a mutation, you first call `useEditPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPasswordMutation, { data, loading, error }] = useEditPasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useEditPasswordMutation(baseOptions?: Apollo.MutationHookOptions<EditPasswordMutation, EditPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPasswordMutation, EditPasswordMutationVariables>(EditPasswordDocument, options);
      }
export type EditPasswordMutationHookResult = ReturnType<typeof useEditPasswordMutation>;
export type EditPasswordMutationResult = Apollo.MutationResult<EditPasswordMutation>;
export type EditPasswordMutationOptions = Apollo.BaseMutationOptions<EditPasswordMutation, EditPasswordMutationVariables>;
export const SelfDeleteDocument = gql`
    mutation SelfDelete {
  selfDelete
}
    `;
export type SelfDeleteMutationFn = Apollo.MutationFunction<SelfDeleteMutation, SelfDeleteMutationVariables>;

/**
 * __useSelfDeleteMutation__
 *
 * To run a mutation, you first call `useSelfDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSelfDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [selfDeleteMutation, { data, loading, error }] = useSelfDeleteMutation({
 *   variables: {
 *   },
 * });
 */
export function useSelfDeleteMutation(baseOptions?: Apollo.MutationHookOptions<SelfDeleteMutation, SelfDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SelfDeleteMutation, SelfDeleteMutationVariables>(SelfDeleteDocument, options);
      }
export type SelfDeleteMutationHookResult = ReturnType<typeof useSelfDeleteMutation>;
export type SelfDeleteMutationResult = Apollo.MutationResult<SelfDeleteMutation>;
export type SelfDeleteMutationOptions = Apollo.BaseMutationOptions<SelfDeleteMutation, SelfDeleteMutationVariables>;
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