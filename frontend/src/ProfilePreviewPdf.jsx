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
      width: "35%",
      padding: 25,
      borderRight: "1pt solid #ccc",
      backgroundColor: "#d8e7f2",
    },
    rightPanel: {
      width: "65%",
      padding: 20,
    },
    profileImage: {
      width: 135,
      height: 135,
      objectFit: 'cover',
      borderRadius: 100,  
      borderWidth: 8,
      borderStyle: 'solid',
      borderColor: '#504f4f',
      marginBottom: 35,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#000000',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: '#a5a2a2',
      paddingBottom: 6,
      marginBottom: 8,
      width: '100%',
    },
    contactSection: {
      marginBottom: 30,
      textAlign: 'left',
    },
    link: {
      color: '#333',
      textDecoration: 'none',
      wordBreak: 'break-all',
    },
    skillsSection: {
      marginBottom: 20,
      textAlign: 'left',
    },
    skillsList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
      marginTop: 10,
    },
    skillPill: {
        textTransform: 'uppercase',
        marginBottom: 4,
        marginRight: 4,
        fontFamily: 'Helvetica-Bold',
        paddingVertical: 4,
        paddingHorizontal: 10,
        fontSize: 8,
        fontWeight:'bold',
        borderRadius: 8,
        backgroundColor: '#ebf4fa', 
        color: '#000000', 
        borderWidth: 0.5,
        borderStyle: 'solid',
        borderColor: '#c4d8e7',
        elevation: 2, 
        shadowOpacity: 0.1,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 1 },
      },
    linkedinText: {
      color: '#00000',
      textDecoration: 'none',
      marginTop: 5,
      fontSize: 10,
    },
    text: {
      fontSize: 10,
      marginBottom: 5,
      lineHeight: 1.4,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
      textTransform: 'uppercase',
    },
    timelineItem: {
      marginBottom: 15,
    },
    boldText: {
      fontWeight: 'bold',
    }
  });
  
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Panel */}
        <View style={styles.leftPanel}>
          <Image src={data.profilePicture} style={styles.profileImage} />
  
          {/* Contact Section */}
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <Text style={styles.text}>{data.contactInfo.email}</Text>
            <Link src={data.contactInfo.linkedin} style={styles.link}>
              <Text style={styles.linkedinText}>LinkedIn Profile</Text>
            </Link>
          </View>
  
          {/* Skills Section */}
          <View style={styles.skillsSection}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsList}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skillPill}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        </View>
  
        {/* Right Panel */}
        <View style={styles.rightPanel}>
          <Text style={styles.name}>{data.name}</Text>
  
          {/* Education */}
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.timelineItem}>
              <Text style={styles.text}>
                <Text style={styles.boldText}>{edu.school}</Text> | {edu.startDate} - {edu.endDate}
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
                <Text style={styles.boldText}>{exp.company}</Text> | {exp.location}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.boldText}>{exp.title}</Text> | {exp.startDate} - {exp.endDate}
              </Text>
              <Text style={styles.text}>{exp.description}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
  
  export default MyDocument;