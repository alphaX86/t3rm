export default function Skills() {
  const skills = {
    "Languages": ["C/C++", "Java", "JavaScript", "Python", "SQL", "Go", "Scala"],
    "Frameworks": ["React", "Next.js", "TensorFlow", "PyTorch", "Maven"],
    "Backend": ["Node.js", "Express", "PostgreSQL"],
    "Tools": ["Git", "Docker", "Figma", "Linux", "Tableau"],
    "Databases": ["MySQL", "MongoDB", "Oracle DB"],
    "Data Science": ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn"],
  };

  return (
    <div className="skills-output space-y-3">
      <p className="text-zinc-400">Technical skills:</p>
      {Object.entries(skills).map(([category, items]) => (
        <div key={category}>
          <span className="text-yellow-400">{category}:</span>
          <div className="ml-4 flex flex-wrap gap-2 mt-1">
            {items.map((skill) => (
              <span 
                key={skill} 
                className="text-green-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
