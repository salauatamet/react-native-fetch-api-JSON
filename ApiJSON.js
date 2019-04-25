import React, { Component } from 'react';

import {
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Text,
    View,
    Alert,
    RefreshControl,
} from 'react-native';

export default class Project extends Component {
    constructor(props) {
        super(props);
        this.state = { refreshing: true };
        this.GetData();
    }

    GetData = () => {
        return fetch('https://clicklink.in/users.json', {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': 0
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    refreshing: false,
                    dataSource: responseJson
                });
            })
            .catch(error => {
                console.error(error);
            });
    };
    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: 0.2,
                    width: '90%',
                    backgroundColor: '#808080',
                }}
            />
        );
    };
    onRefresh() {
        this.setState({ dataSource: [] });
        this.GetData();
    }
    render() {
        if (this.state.refreshing) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.MainContainer}>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    enableEmptySections={true}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.rowViewContainer}
                                onPress={() => alert(item.id)}>
                                {item.name}
                            </Text>
                            <Text style={styles.rowViewContainer}
                                onPress={() => alert(item.id)}>
                                {item.username}
                            </Text>
                            <Text style={styles.rowViewContainer}
                                onPress={() => alert(item.id)}>
                                {item.email}
                            </Text>
                            <Text style={styles.rowViewContainer}
                                onPress={() => alert(item.id)}>
                                {item.phone}
                            </Text>
                        </View>
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 10,
    },
    rowViewContainer: {
        fontSize: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        fontSize: 18,
        color: '#000000'
    },
});
