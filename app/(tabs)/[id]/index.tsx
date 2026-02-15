import { View, ActivityIndicator, StyleSheet, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import { fetchUser } from '@/services/users'
import { ScreenWrapper } from '@/components/ScreenWrapper';
import Button from '@/components/ui/Button';
import { Header } from '@/components/Header';
import { useQuery } from '@tanstack/react-query';
import { Level } from '@/components/Level';

export default function ProfileScreen() {
    const { t } = useTranslation();
    const { id } = useLocalSearchParams<{ id: string }>();

    const { data: user, isLoading } = useQuery({
        queryKey: ['userSearch', id.toLowerCase()],
        queryFn: () => fetchUser({ login: id.toLowerCase() }),
        staleTime: 1000 * 60 * 5,
    });

    const handleOpenIntra = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        const url = `https://intra.42.fr/users/${id}`;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    };

    if (isLoading) {
        return (
            <ScreenWrapper>
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                </View>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.mainContent}>
                    <Header user={user || null} />
                    <Level user={user || null} />
                </View>

				<Button type="primary" onPress={handleOpenIntra}>
					{t('open_profile')}
				</Button>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    mainContent: {
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 20,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
