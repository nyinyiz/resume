export default function Skills() {
  const skills = {
    languages: [
      { name: "Kotlin", level: 5 },
      { name: "Java", level: 4 },
      { name: "Dart", level: 4 },
      { name: "Swift", level: 3 },
      { name: "TypeScript", level: 3 },
      { name: "Python", level: 2 }
    ],
    frameworks: [
      { name: "Android SDK", level: 5 },
      { name: "Flutter", level: 4 },
      { name: "React Native", level: 3 },
      { name: "SwiftUI", level: 2 },
      { name: "Jetpack Compose", level: 4 },
      { name: "Spring Boot", level: 2 }
    ],
    tools: [
      { name: "Git", level: 5 },
      { name: "Firebase", level: 4 },
      { name: "Android Studio", level: 5 },
      { name: "VS Code", level: 4 },
      { name: "Xcode", level: 3 },
      { name: "Jenkins", level: 3 },
      { name: "Jira", level: 4 },
      { name: "Figma", level: 3 }
    ],
    concepts: [
      { name: "Clean Architecture", level: 4 },
      { name: "MVVM", level: 5 },
      { name: "CI/CD", level: 4 },
      { name: "Agile/Scrum", level: 4 },
      { name: "Unit Testing", level: 4 },
      { name: "REST APIs", level: 5 }
    ]
  };

  return (
    <section id="skills" className="space-y-12 py-8">
      <h2 className="text-3xl font-bold">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="space-y-6">
            <h3 className="text-2xl font-semibold capitalize">{category}</h3>
            <div className="space-y-4">
              {items.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">
                      {skill.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {skill.level}/5
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 