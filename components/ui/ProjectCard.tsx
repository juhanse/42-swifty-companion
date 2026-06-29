import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchTeamUsers, ProjectUser, TeamUser } from '@/services/projects';
import { Colors } from '@/constants/colors';

interface ProjectCardProps {
    projectUser: ProjectUser;
}

export const ProjectCard = ({ projectUser }: ProjectCardProps) => {
    const [teamUsers, setTeamUsers] = useState<TeamUser[] | null>(null);
    const isSuccess = projectUser["validated?"];

    useEffect(() => {
        let isMounted = true;

        const loadTeam = async () => {
            if (projectUser.current_team_id) {
                try {
                    const data = await fetchTeamUsers({ id: projectUser.current_team_id });
                    if (isMounted) {
                        setTeamUsers(data);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        loadTeam();

        return () => {
            isMounted = false;
        };
    }, [projectUser.current_team_id]);

    const isGroupProject = teamUsers && teamUsers.length > 1;

    const formattedDate = new Date(projectUser.marked_at).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });

    const cardContent = (
        <>
            <Text style={[styles.mark, !isSuccess && { color: Colors.badge.STAFF }]}>
                {projectUser.final_mark}
            </Text>

            <View style={styles.infoFrame}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={1}>
                        {projectUser.project.name}
                    </Text>
                    {isSuccess && <Text style={styles.date}>{formattedDate}</Text>}
                </View>

                {isGroupProject && (
                    <View style={styles.groupContainer}>
                        {teamUsers.map((user, index) => (
                            <Image
                                key={user.id}
                                source={{ uri: user.image.link }}
                                style={[
                                    styles.avatar,
                                    { zIndex: 10 - index, marginLeft: index === 0 ? 0 : -10 }
                                ]}
                            />
                        ))}
                    </View>
                )}
            </View>
        </>
    );

    return (
        <View style={styles.outerContainer}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.2)', 'rgba(238, 237, 237, 0.1)']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 0.4, y: 0.5 }}
                style={styles.borderWrapper}
            >
                <View style={styles.innerContainer}>
                    {isSuccess ? (
                        <LinearGradient
                            colors={Colors.gradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.cardBase}
                        >
                            {cardContent}
                        </LinearGradient>
                    ) : (
                        <View style={[styles.cardBase, { backgroundColor: '#000000' }]}>
                            {cardContent}
                        </View>
                    )}
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        width: 250,
        height: 270,
    },
    borderWrapper: {
        flex: 1,
        borderRadius: 50,
        padding: 2,
    },
    innerContainer: {
        flex: 1,
        borderRadius: 48,
        overflow: 'hidden',
    },
    cardBase: {
        flex: 1,
        padding: 40,
        justifyContent: 'space-between',
    },
    mark: {
        fontSize: 60,
        fontFamily: "SF-Bold",
        color: '#fff',
    },
    infoFrame: {
        gap: 30,
    },
    titleContainer: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 24,
        fontFamily: "SF-Medium",
        color: '#fff',
    },
    date: {
        fontSize: 12,
        fontFamily: "SF-Medimum",
        color: '#fff',
    },
    groupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
    },
});
