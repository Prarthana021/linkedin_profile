import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";
import data from "./dummy.json";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 0,
  },
  leftPanel: {
    width: "40%",
    padding: 25,
    borderRight: "1pt solid #ccc",
    backgroundColor: "#d8e7f2",
  },
  rightPanel: {
    width: "65%",
    paddingLeft: 10,
  },
  profileImage: {
    width: 145,
    height: 145,
    objectFit: 'cover', 
    borderRadius: 100, 
    // border: '8px solid #504f4f',
    marginBottom: 35,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 4,
    marginTop: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 10,
    marginBottom: 2,
  },
  skillItem: {
    fontSize: 10,
    marginBottom: 2,
    paddingLeft: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  timelineItem: {
    marginBottom: 8,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Left Panel */}
      <View style={styles.leftPanel}>
        <Image src={data.profilePicture} style={styles.profileImage} />

        {/* Contact */}
        <Text style={styles.sectionTitle}>Contact</Text>
        <Text style={styles.text}>{data.contactInfo.email}</Text>
        <Link src={data.contactInfo.linkedin}>
          <Text style={{ ...styles.text, color: "#0077b5" }}>
            LinkedIn Profile
          </Text>
        </Link>

        {/* Skills */}
        <Text style={styles.sectionTitle}>Skills</Text>
        {data.skills.map((skill, index) => (
          <Text key={index} style={styles.skillItem}>
            • {skill}
          </Text>
        ))}
      </View>

      {/* Right Panel */}
      <View style={styles.rightPanel}>
        <Text style={styles.name}>{data.name.toUpperCase()}</Text>

        {/* Education */}
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu, index) => (
          <View key={index} style={styles.timelineItem}>
            <Text style={styles.text}>
              <Text>{edu.school}</Text> | {edu.startDate} - {edu.endDate}
            </Text>
            <Text style={styles.text}>
              {edu.degree} in {edu.fieldOfStudy}
            </Text>
            <Text style={styles.text}>{edu.description}</Text>
          </View>
        ))}

        {/* Experience */}
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experience.map((exp, index) => (
          <View key={index} style={styles.timelineItem}>
            <Text style={styles.text}>
              <Text>{exp.company}</Text> | {exp.location}
            </Text>
            <Text style={styles.text}>
              <Text>{exp.title}</Text> | {exp.startDate} - {exp.endDate}
            </Text>
            <Text style={styles.text}>{exp.description}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default MyDocument;
