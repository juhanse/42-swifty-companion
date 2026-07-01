import { useState, useEffect } from 'react';
import { View, ActivityIndicator, Linking, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { fetchUser } from '@/services/users'
import { ScreenWrapper } from '@/components/ScreenWrapper';
import Button from '@/components/ui/Button';
import { Header } from '@/components/Header';
import { Level } from '@/components/Level';
import { Projects } from '@/components/Projects';
import Skills from '@/components/Skills';
import { User } from '@/services/users';

export default function ProfileScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        const loadUser = async () => {
            try {
                setIsLoading(true);
                const data = await fetchUser({ login: id.toLowerCase() });
                if (isMounted) {
                    setUser(data);
                }
            } catch (error: any) {
                const isExpectedError = error?.response?.status === 404 || error?.message === 'Network Error';
                if (!isExpectedError) {
                    console.error("Error when loading user:", error);
                }
                
                if (isMounted) {
                    router.replace('/'); 
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadUser();

        return () => {
            isMounted = false;
        };
    }, [id, router]);

    const handleOpenIntra = async () => {
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
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            </ScreenWrapper>
        );
    }

    if (!user) {
        return null; 
    }

    return (
        <ScreenWrapper>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.mainContent}>
                    <Header user={user || null} />
                    <Level user={user || null} />
                    <Projects projects={user?.projects_users || []} />
                    <Skills skills={user?.cursus_users?.[0].skills || []} />
                </View>

                <Button type="primary" onPress={handleOpenIntra}>
                    Open profile
                </Button>
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    mainContent: {
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 20,
        paddingBottom: 40,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
