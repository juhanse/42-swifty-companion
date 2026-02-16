import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchTeamUsers, ProjectUser } from '@/services/projects';
import { Colors } from '@/constants/colors';

interface ProjectCardProps {
    projectUser: ProjectUser;
}

export const ProjectCard = ({ projectUser }: ProjectCardProps) => {
    const isSuccess = projectUser["validated?"];
    
    const { data: teamUsers } = useQuery({
        queryKey: ['team', projectUser.current_team_id],
        queryFn: () => fetchTeamUsers({ id: projectUser.current_team_id }),
        staleTime: 1000 * 60 * 30,
        enabled: !!projectUser.current_team_id,
    });

    const isGroupProject = teamUsers && teamUsers.length > 1;
    
    const formattedDate = new Date(projectUser.marked_at).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });

    const BackgroundComponent = isSuccess ? LinearGradient : View;
    const backgroundProps = isSuccess ? {
        colors: ['#8CD270', '#B0CB7C', '#80B2B3'],
        locations: [0, 0.5, 1],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 }
    } : {
        style: { backgroundColor: '#000000' }
    };

    return (
        <View style={styles.outerContainer}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.2)', 'rgba(238, 237, 237, 0.1)']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 0.4, y: 0.5 }}
                style={styles.borderWrapper}
            >
                <View style={styles.innerContainer}>
                    {/* @ts-ignore - Le typage dynamique entre View et LinearGradient peut être strict */}
                    <BackgroundComponent {...backgroundProps} style={[styles.cardBase, backgroundProps.style]}>
                        
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

                    </BackgroundComponent>
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
