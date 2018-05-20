// Copyright (c) 2018-present TF Chat, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSelector} from 'reselect';

function getAllFiles(state) {
    return state.entities.files.files;
}

function getFilesIdsForPost(state, postId) {
    if (postId) {
        return state.entities.files.fileIdsByPostId[postId] || [];
    }

    return [];
}

export function getFilePublicLink(state) {
    return state.entities.files.filePublicLink;
}

export function makeGetFilesForPost() {
    return createSelector(
        [getAllFiles, getFilesIdsForPost],
        (allFiles, fileIdsForPost) => {
            return fileIdsForPost.map((id) => allFiles[id]).filter((id) => Boolean(id));
        }
    );
}
