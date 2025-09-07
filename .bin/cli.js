#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GREEN = '\x1b[32m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

const [, , command, ...args] = process.argv;

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toCamelCase(str) {
  return str
    .replace(/[^a-zA-Z]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .split('-')
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');
}

if (command === 'resource') {
  const resourceNameRaw = args[0];
  if (!resourceNameRaw) {
    console.error('❌ Please provide a resource name');
    process.exit(1);
  }

  const resourceName = toCamelCase(resourceNameRaw.toLowerCase());
  const capitalizedResourceName = capitalize(resourceName);

  const moduleDir = path.join(__dirname, '..', 'src', 'app', 'modules', resourceName);
  if (!fs.existsSync(moduleDir)) fs.mkdirSync(moduleDir, { recursive: true });

  const formatPath = (filePath) => path.relative(path.join(__dirname, '..'), filePath);

  // ---------- ROUTE ----------
  const routeContent = `
import { Router } from "express";
import { ${resourceName}Controllers } from "./${resourceName}.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ${resourceName}Validation } from "./${resourceName}.validation";

const router = Router();

/** Create a new ${capitalizedResourceName} */
router.post(
  "/create-${resourceName}",
  validateRequest(${resourceName}Validation.create${capitalizedResourceName}Schema),
  ${resourceName}Controllers.create${capitalizedResourceName}
);

export const ${resourceName}Routes = router;
`.trim();

  // ---------- CONTROLLER ----------
  const controllerContent = `
import { ${resourceName}Services } from "./${resourceName}.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

/** Create a new ${capitalizedResourceName} */
const create${capitalizedResourceName} = catchAsync(async (req, res) => {
  const result = await ${resourceName}Services.create${capitalizedResourceName}(req.body);
  sendResponse(res, { message: "New ${capitalizedResourceName} created successfully", data: result });
});

/** Get a single ${capitalizedResourceName} by ID */
const getSingle${capitalizedResourceName} = catchAsync(async (req, res) => {
  const result = await ${resourceName}Services.get${capitalizedResourceName}ById(req.params.id);
  sendResponse(res, { message: "${capitalizedResourceName} retrieved successfully", data: result });
});

/** Get all ${capitalizedResourceName}s */
const getAll${capitalizedResourceName} = catchAsync(async (req, res) => {
  const result = await ${resourceName}Services.getAll${capitalizedResourceName}(req.query);
  sendResponse(res, { message: "${capitalizedResourceName}s retrieved successfully", data: result });
});

export const ${resourceName}Controllers = {
  create${capitalizedResourceName},
  getSingle${capitalizedResourceName},
  getAll${capitalizedResourceName},
};
`.trim();

  // ---------- MODEL ----------
  const modelContent = `
import { Schema, model, Document } from "mongoose";
import { I${capitalizedResourceName} } from "./${resourceName}.interface";

/** ${capitalizedResourceName} schema definition */
const ${capitalizedResourceName}Schema = new Schema<I${capitalizedResourceName}>(
  {
    // Define fields here
  },
  { timestamps: true, versionKey: false }
);

export const ${capitalizedResourceName}Model = model<I${capitalizedResourceName}>(
  "${capitalizedResourceName}",
  ${capitalizedResourceName}Schema
);
`.trim();

  // ---------- INTERFACE ----------
  const interfaceContent = `
import { Document } from "mongoose";

export interface I${capitalizedResourceName} extends Document {
  // Example field, replace with real ones
  id?: string;
};
`.trim();

  // ---------- VALIDATION ----------
  const validationContent = `
import { z } from "zod";

/** Validation schema for creating ${capitalizedResourceName} */
const create${capitalizedResourceName}Schema = z.object({
  body: z.object({
    // Add validation rules
  }),
});

export const ${resourceName}Validation = {
  create${capitalizedResourceName}Schema,
};
`.trim();

  // ---------- SERVICE ----------
  const serviceContent = `
import { ${capitalizedResourceName}Model } from "./${resourceName}.model";
import { I${capitalizedResourceName} } from "./${resourceName}.interface";

/** Create a new ${capitalizedResourceName} */
const create${capitalizedResourceName} = async (data: I${capitalizedResourceName}) => {
  return await ${capitalizedResourceName}Model.create(data);
};

/** Get a ${capitalizedResourceName} by ID */
const get${capitalizedResourceName}ById = async (id: string) => {
  return await ${capitalizedResourceName}Model.findById(id);
};

/** Get all ${capitalizedResourceName}s */
const getAll${capitalizedResourceName} = async (query: any) => {
  return await ${capitalizedResourceName}Model.find(query);
};

export const ${resourceName}Services = {
  create${capitalizedResourceName},
  get${capitalizedResourceName}ById,
  getAll${capitalizedResourceName},
};
`.trim();

  // ---------- FILES ----------
  const files = {
    [path.join(moduleDir, `${resourceName}.route.ts`)]: routeContent,
    [path.join(moduleDir, `${resourceName}.controller.ts`)]: controllerContent,
    [path.join(moduleDir, `${resourceName}.model.ts`)]: modelContent,
    [path.join(moduleDir, `${resourceName}.interface.ts`)]: interfaceContent,
    [path.join(moduleDir, `${resourceName}.validation.ts`)]: validationContent,
    [path.join(moduleDir, `${resourceName}.service.ts`)]: serviceContent,
  };

  for (const [filePath, content] of Object.entries(files)) {
    fs.writeFileSync(filePath, content);
    console.log(
      `${GREEN}CREATE ${RESET}${formatPath(filePath)} ${BLUE}(${Buffer.byteLength(
        content,
        'utf8'
      )} bytes)`
    );
  }
} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
