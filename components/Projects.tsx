import { useMemo, useCallback } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ProjectUser } from '@/services/users';

interface ProjectsProps {
    projects: ProjectUser[];
}

export const Projects = ({ projects }: ProjectsProps) => {
    const finishedProjects = useMemo(() => {
        return projects
            .filter(p => p.status === 'finished')
            .sort((a, b) => new Date(b.marked_at).getTime() - new Date(a.marked_at).getTime());
    }, [projects]);

    const getItemLayout = useCallback((data: any, index: number) => ({
        length: 270, 
        offset: 270 * index,
        index,
    }), []);

    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Projects :</Text>
            <FlatList
                data={finishedProjects}
                horizontal
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                windowSize={3}
                getItemLayout={getItemLayout}
                removeClippedSubviews={true}
                scrollEventThrottle={16}
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                snapToInterval={270}
                decelerationRate="fast"
                renderItem={({ item }) => (
                    <ProjectCard projectUser={item} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: "SF-Bold",
        color: "#fff",
        marginBottom: 10,
    },
    listContent: {
        gap: 10,
    },
});
