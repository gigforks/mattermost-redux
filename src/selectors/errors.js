// Copyright (c) 2018-present TF Chat, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

export function getDisplayableErrors(state) {
    return state.errors.filter((error) => error.displayable);
}
