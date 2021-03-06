/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @flow

import explicitConnect from '../../utils/connect';
import { selectedThreadSelectors } from '../../selectors/per-thread';
import FilterNavigatorBar from './FilterNavigatorBar';
import { popTransformsFromStack } from '../../actions/profile-view';

import type { State } from '../../types/state';
import type { ElementProps } from 'react';

import './TransformNavigator.css';

type Props = ElementProps<typeof FilterNavigatorBar>;
type DispatchProps = {|
  +onPop: $PropertyType<Props, 'onPop'>,
|};
type StateProps = $Diff<Props, DispatchProps>;

export default explicitConnect<{||}, StateProps, DispatchProps>({
  mapStateToProps: (state: State) => {
    const items = selectedThreadSelectors.getTransformLabels(state);
    return {
      className: 'calltreeTransformNavigator',
      items,
      selectedItem: items.length - 1,
    };
  },
  mapDispatchToProps: { onPop: popTransformsFromStack },
  component: FilterNavigatorBar,
});
