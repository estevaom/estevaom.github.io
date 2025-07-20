use clap::Parser;
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use std::collections::HashMap;
use std::fs;
use std::path::Path;

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    /// Input data directory
    #[arg(short, long, default_value = "../data")]
    input: String,

    /// Output directory for generated API
    #[arg(short, long, default_value = "../dist/api")]
    output: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct Technology {
    handler: String,
    name: String,
    url: Option<String>,
}

#[derive(Debug, Deserialize, Serialize)]
struct Employment {
    name: String,
    title: String,
    location: String,
    remote: bool,
    url: Option<String>,
    description: Vec<String>,
    technologies: Vec<String>,
    featured: Option<bool>,
}

#[derive(Debug, Deserialize, Serialize)]
struct TechnologyCategory {
    #[serde(rename = "type")]
    category_type: String,
    handlers: Vec<String>,
}

#[derive(Debug, Deserialize, Serialize)]
struct ResumeData {
    technologies: Vec<TechnologyCategory>,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = Args::parse();

    println!("Building GraphQL-like API with Rust...");
    println!("Reading from: {}", args.input);
    println!("Writing to: {}", args.output);

    let technologies: Vec<Technology> = load_json(&args.input, "technologies.json")?;
    let employment: Vec<Employment> = load_json(&args.input, "employment.json")?;
    let resume_data: ResumeData = load_json(&args.input, "resume.json")?;

    fs::create_dir_all(&args.output)?;

    let mut api_responses = HashMap::new();

    api_responses.insert("allTechnologies", json!(technologies));

    let featured: Vec<&Employment> = employment
        .iter()
        .filter(|e| e.featured.unwrap_or(false))
        .collect();
    api_responses.insert("featuredEmployment", json!(featured));

    let employment_enriched: Vec<Value> = employment
        .iter()
        .map(|emp| {
            let tech_details: Vec<&Technology> = emp
                .technologies
                .iter()
                .filter_map(|handler| technologies.iter().find(|t| &t.handler == handler))
                .collect();

            json!({
                "name": emp.name,
                "title": emp.title,
                "location": emp.location,
                "remote": emp.remote,
                "url": emp.url,
                "description": emp.description,
                "technologies": tech_details,
                "featured": emp.featured
            })
        })
        .collect();
    api_responses.insert("employmentWithTechnologies", json!(employment_enriched));

    let tech_by_category: Vec<Value> = resume_data
        .technologies
        .iter()
        .map(|cat| {
            let techs: Vec<&Technology> = cat
                .handlers
                .iter()
                .filter_map(|handler| technologies.iter().find(|t| &t.handler == handler))
                .collect();

            json!({
                "type": cat.category_type,
                "technologies": techs
            })
        })
        .collect();
    api_responses.insert("technologiesByCategory", json!(tech_by_category));

    api_responses.insert(
        "profileData",
        json!({
            "name": "Estevão de Abreu Machado",
            "title": "Full Stack Developer & Engineering Manager",
            "totalTechnologies": technologies.len(),
            "totalEmployment": employment.len()
        }),
    );

    let output_path = Path::new(&args.output).join("responses.json");
    let pretty_json = serde_json::to_string_pretty(&api_responses)?;
    fs::write(&output_path, pretty_json)?;

    println!("API built successfully!");
    println!("Output written to: {}", output_path.display());

    println!("\nSummary:");
    println!("  - {} technologies", technologies.len());
    println!("  - {} employment entries", employment.len());
    println!("  - {} featured positions", featured.len());
    println!(
        "  - {} technology categories",
        resume_data.technologies.len()
    );

    Ok(())
}

fn load_json<T: for<'de> Deserialize<'de>>(
    base_path: &str,
    filename: &str,
) -> Result<T, Box<dyn std::error::Error>> {
    let path = Path::new(base_path).join(filename);
    let contents = fs::read_to_string(&path)?;
    let data = serde_json::from_str(&contents)?;
    Ok(data)
}
