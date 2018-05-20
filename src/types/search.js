// Copyright (c) 2018-present ZeroChat, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
// @flow

export type Search = {
    terms: string,
    isOrSearch: boolean
}

export type SearchState = {
    results: Array<string>,
    recent: {[string]: Array<Search>}
};
