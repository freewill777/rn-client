import React from 'react'

import ScreenShell from '../../components/screenShell'
import ScreenHeader from '../../components/screenHeader'
import ScreenContentShell from '../../components/screenContentShell'

import ListItem from '../../components/listItem'
import List from '../../components/list'

const GroupsScreen = ({ navigation }) => {

    return (
        <ScreenShell>
            <ScreenHeader title={'Grupuri'} />
            <ScreenContentShell>
                <List
                    data={[{}, {}, {}, {}]}
                    renderItem={() => <ListItem title='Group 1' subtitle='Basket' />}
                />
            </ScreenContentShell>
        </ScreenShell>
    )

}

export default GroupsScreen