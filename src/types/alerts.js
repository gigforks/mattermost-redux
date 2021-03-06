// Copyright (c) 2018-present TF Chat, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
// @flow

export type AlertTypeType = 'notification' | 'developer' | 'error';
export type AlertType = {|
    type: AlertTypeType,
    message: string
|};
