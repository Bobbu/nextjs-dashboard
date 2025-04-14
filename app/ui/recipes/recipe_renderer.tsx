// ui/recipes/recipe_renderer.tsx

import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import React from 'react';

interface RecipeProps {
  recipe: any;
}

export default function RecipePage({ recipe }: RecipeProps) {
  return (
    <>
      <Head>
        <title>{recipe.name}</title>
        <meta name="description" content={recipe.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(recipe) }}
        />
      </Head>

      <main style={{ padding: '2rem' }}>
        <h1>{recipe.name}</h1>
        <p><strong>Author:</strong> {recipe.author?.name}</p>
        <p><strong>Description:</strong> {recipe.description}</p>
        <p><strong>Prep time:</strong> {recipe.prepTime}</p>
        <p><strong>Cook time:</strong> {recipe.cookTime}</p>
        <p><strong>Yield:</strong> {recipe.recipeYield}</p>

        <h2>Ingredients</h2>
        <ul>
          {recipe.recipeIngredient.map((ing: string, i: number) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>

        <h2>Instructions</h2>
        <ol>
          {recipe.recipeInstructions.map((step: string, i: number) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const recipesDir = path.join(process.cwd(), 'recipes');
  const filenames = fs.readdirSync(recipesDir);

  const paths = filenames.map((name) => ({
    params: { slug: name.replace(/\.json$/, '') },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(process.cwd(), 'recipes', `${slug}.json`);
  const recipeData = fs.readFileSync(filePath, 'utf-8');
  const recipe = JSON.parse(recipeData);

  return { props: { recipe } };
};
