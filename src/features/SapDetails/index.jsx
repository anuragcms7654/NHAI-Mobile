import { StyleSheet, Text, View } from 'react-native'
import { Card, Divider, Avatar } from "react-native-paper";
import { colors } from '@/src/utils/colorCode';
import React from 'react'

const index = ({ sap_id,
    name,
    dob,
    mobile_number,
    email_id,
    designation,
    office_location
}) => {

    const nameSplitting = name?.split(' ');
    const capitalizedNames = nameSplitting.map(name => name.charAt(0).toUpperCase());
    const SplittedFirstLetter = capitalizedNames.join('');

    return (
        <View>
            <Card style={styles.sapDetailsCard}>
                <Card.Title
                    title={name}
                    subtitle={designation}
                    style={styles.spaDetailsHeader}
                    titleStyle={styles.sapDetailstitle} // Custom style for title
                    subtitleStyle={styles.sapDetailssubtitle}
                    left={(props) => <Text {...props} style={styles.NameLabel}>{SplittedFirstLetter}</Text>} // Append text instead of icon
                />
                <Divider />
                <Card.Content style={styles.sapDeatilsMainDiv}>
                    <View style={styles.SapDeatilsInner}>
                        <Text style={styles.SapDeatilsInnertitle}>SAP ID</Text>
                        <Text style={styles.SapDeatilsInnercontent}>{sap_id}</Text>
                    </View>
                    <View style={styles.SapDeatilsInner}>
                        <Text style={styles.SapDeatilsInnertitle}>Mobile Number</Text>
                        <Text style={styles.SapDeatilsInnercontent}>{mobile_number}</Text>
                    </View>
                    <View style={styles.SapDeatilsInner}>
                        <Text style={styles.SapDeatilsInnertitle}>Date of Birth</Text>
                        <Text style={styles.SapDeatilsInnercontent}>{dob}</Text>
                    </View>
                    <View style={styles.SapDeatilsInner}>
                        <Text style={styles.SapDeatilsInnertitle}>Email ID</Text>
                        <Text style={styles.SapDeatilsInnercontent}>{email_id}</Text>
                    </View>
                    <View style={styles.SapDeatilsInner}>
                        <Text style={styles.SapDeatilsInnertitle}>Office Location</Text>
                        <Text style={styles.SapDeatilsInnercontent}>{office_location}</Text>
                    </View>
                </Card.Content>
            </Card>
        </View>
    )
}

export default index

const styles = StyleSheet.create({

    sapDetailsCard: {
        backgroundColor: colors.gray400,
        borderRadius: 8,
        marginTop: 4,
        // padding:4
    },
    NameLabel: {
        backgroundColor: 'red',
        height: 45,
        padding: 11,
        fontWeight: 500,
        width: 45,
        fontSize: 16,
        borderRadius: 50,
        color: 'white',
    },
    sapDetailstitle: {
        fontSize: 18,
        fontFamily: "Inter-Black",
        fontWeight: 800,
        // lineHeight: 24,
        color: colors.gray800,
    },
    sapDetailssubtitle: {
        color: colors.gray700,
        fontSize: 12,
        marginTop: -7,
    },
    SapDeatilsInner: {
        flexDirection: 'row',
        padding: 5,
        lineHeight: 18,
    },
    SapDeatilsInnertitle: {
        fontSize: 12,
        color: colors.gray700,
        flex: 2
    },
    SapDeatilsInnercontent: {
        fontSize: 12,
        fontWeight: '500',
        flex: 3,
        marginRight: 10
    },
    sapDeatilsMainDiv: {
        marginTop: 20
    },
    spaDetailsHeader: {
        marginTop: 5,
        marginBottom: 5,
    }
})