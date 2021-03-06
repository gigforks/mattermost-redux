// Copyright (c) 2018-present TF Chat, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Client4} from 'client';
import {RoleTypes} from 'action_types';

import {getRoles} from 'selectors/entities/roles';
import {hasNewPermissions} from 'selectors/entities/general';

import {bindClientFunc} from './helpers';

export function getRolesByNames(rolesNames) {
    return bindClientFunc(
        Client4.getRolesByNames,
        RoleTypes.ROLES_BY_NAMES_REQUEST,
        [RoleTypes.RECEIVED_ROLES, RoleTypes.ROLES_BY_NAMES_SUCCESS],
        RoleTypes.ROLES_BY_NAMES_FAILURE,
        rolesNames
    );
}

export function getRoleByName(roleName) {
    return bindClientFunc(
        Client4.getRoleByName,
        RoleTypes.ROLE_BY_NAME_REQUEST,
        [RoleTypes.RECEIVED_ROLE, RoleTypes.ROLE_BY_NAME_SUCCESS],
        RoleTypes.ROLE_BY_NAME_FAILURE,
        roleName
    );
}

export function getRole(roleId) {
    return bindClientFunc(
        Client4.getRole,
        RoleTypes.ROLE_BY_ID_REQUEST,
        [RoleTypes.RECEIVED_ROLE, RoleTypes.ROLE_BY_ID_SUCCESS],
        RoleTypes.ROLE_BY_ID_FAILURE,
        roleId
    );
}

export function editRole(role) {
    return bindClientFunc(
        Client4.patchRole,
        RoleTypes.EDIT_ROLE_REQUEST,
        [RoleTypes.RECEIVED_ROLE, RoleTypes.EDIT_ROLE_SUCCESS],
        RoleTypes.EDIT_ROLE_FAILURE,
        role.id,
        role
    );
}

export function setPendingRoles(roles) {
    return async (dispatch, getState) => {
        dispatch({type: RoleTypes.SET_PENDING_ROLES, data: roles}, getState);
        return {data: roles};
    };
}

export function loadRolesIfNeeded(roles) {
    return async (dispatch, getState) => {
        const state = getState();
        const pendingRoles = new Set(state.entities.roles.pending);
        for (const role of roles) {
            pendingRoles.add(role);
        }
        if (!state.entities.general.serverVersion) {
            setPendingRoles(Array.from(pendingRoles))(dispatch, getState);
            return {data: []};
        }
        if (!hasNewPermissions(state)) {
            if (state.entities.roles.pending) {
                await setPendingRoles([])(dispatch, getState);
            }
            return {data: []};
        }
        const loadedRoles = getRoles(state);
        const newRoles = new Set();
        for (const role of pendingRoles) {
            if (!loadedRoles[role] && role.trim() !== '') {
                newRoles.add(role);
            }
        }

        if (state.entities.roles.pending) {
            await setPendingRoles([])(dispatch, getState);
        }
        if (newRoles.size > 0) {
            return await getRolesByNames(Array.from(newRoles))(dispatch, getState);
        }
        return {data: state.entities.roles.roles};
    };
}
