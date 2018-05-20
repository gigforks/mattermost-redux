// Copyright (c) 2018-present TF Chat, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

export function getLogs(state) {
    return state.entities.admin.logs;
}

export function getAudits(state) {
    return state.entities.admin.audits;
}

export function getConfig(state) {
    return state.entities.admin.config;
}

export function getEnvironmentConfig(state) {
    return state.entities.admin.environmentConfig;
}

export function getComplianceReports(state) {
    return state.entities.admin.complianceReports;
}

export function getClusterInfo(state) {
    return state.entities.admin.clusterInfo;
}

export function getUserAccessTokens(state) {
    return state.entities.admin.userAccessTokens;
}
