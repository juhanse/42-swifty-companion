import { FlatList, View, StyleSheet, Text } from 'react-native';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ProjectUser } from '@/services/users';

interface ProjectsProps {
    projects: ProjectUser[];
}

export const Projects = ({ projects }: ProjectsProps) => {
    const finishedProjects = projects
        .filter(p => p.status === 'finished')
        .sort((a, b) => new Date(b.marked_at).getTime() - new Date(a.marked_at).getTime());

    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Projects :</Text>
            <FlatList
                data={finishedProjects}
                horizontal
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
