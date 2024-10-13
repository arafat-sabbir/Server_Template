#!/usr/bin/env node

const [, , command, ...args] = process.argv;

import fs from 'fs';
import { program } from 'commander';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Define color codes for console output
const GREEN = '\x1b[32m'; // Green color
const BLUE = '\x1b[34m'; // Blue color
const RESET = '\x1b[0m'; // Reset color

// Regular expression to check for special characters
const specialCharRegex = /[0-9!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|\-=\s]/g;

// Helper function to capitalize the first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper function to convert string to camelCase after replacing unwanted characters with hyphens
function toCamelCase(str) {
  // Replace all non-alphabetic characters (except hyphens) with hyphens
  const hyphenatedStr = str.replace(/[^a-zA-Z]+/g, '-').replace(/^-+|-+$/g, '');

  // Convert hyphenated string to camelCase
  return hyphenatedStr
    .split('-') // Split the string by hyphens
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(''); // Join all words together without hyphens
}

if (command === 'resource') {
  // Command-line options setup
  program
    .version('1.0.0') // Version of the CLI tool
    .description('Generate route, model, controller, and interface files for a new resource') // Description of the tool
    .argument('<name>', 'Resource name') // Argument for resource name
    .action((name) => {
      const resourceName = !specialCharRegex.test(args[0])
        ? args[0].toLowerCase()
        : toCamelCase(args[0]);

      const capitalizedResourceName = capitalize(resourceName);

      // Path to the route directory
      const routeDir = path.join(__dirname, '..', 'src', 'app', 'modules', args[0]);
      // Path to the controller directory
      const controllerDir = path.join(__dirname, '..', 'src', 'app', 'modules', args[0]);
      // Path to the interface directory
      const interfaceDir = path.join(__dirname, '..', 'src', 'app', 'modules', args[0]);
      // Path to the model directory
      const modelsDir = path.join(__dirname, '..', 'src', 'app', 'modules', args[0]);
      // Path to the validation directory
      const validationDir = path.join(__dirname, '..', 'src', 'app', 'modules', args[0]);
      // Path to the service directory
      const serviceDir = path.join(__dirname, '..', 'src', 'app', 'modules', args[0]);

      // Function to format file paths relative to project root
      const formatPath = (filePath) => path.relative(path.join(__dirname, '..'), filePath);

      // Create the resource directories if they don't exist
      [routeDir, controllerDir, modelsDir, interfaceDir].forEach((dir) => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      });

      // Create route file content
      const routeContent = `
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { 
  create${capitalizedResourceName},
  createMany${capitalizedResourceName},
  update${capitalizedResourceName},
  updateMany${capitalizedResourceName},
  delete${capitalizedResourceName},
  deleteMany${capitalizedResourceName},
  get${capitalizedResourceName}ById,
  getMany${capitalizedResourceName}
} from './${args[0]}.controller';

//Import validation from corresponding module
import { validate${capitalizedResourceName}Id } from './${args[0]}.validation';

// Initialize router
const router = Router();

// Define route handlers
/**
 * @route POST /api/v1/${args[0]}/create-${args[0]}
 * @description Create a new ${args[0]}
 * @access Public
 * @param {function} controller - ['create${capitalizedResourceName}']
 */
router.post("/create-${args[0]}", create${capitalizedResourceName});

/**
 * @route POST /api/v1/${args[0]}/create-${args[0]}/many
 * @description Create multiple ${args[0]}
 * @access Public
 * @param {function} controller - ['createMany${capitalizedResourceName}']
 */
router.post("/create-${args[0]}/many", createMany${capitalizedResourceName});

/**
 * @route PUT /api/v1/${args[0]}/update-${args[0]}/many
 * @description Update multiple ${args[0]} information
 * @access Public
 * @param {function} controller - ['updateMany${capitalizedResourceName}']
 */
router.put("/update-${args[0]}/many", updateMany${capitalizedResourceName});

/**
 * @route PUT /api/v1/${args[0]}/update-${args[0]}/:id
 * @description Update ${args[0]} information
 * @param {string} id - The ID of the ${args[0]} to update
 * @access Public
 * @param {function} controller - ['update${capitalizedResourceName}']
 * @param {function} validation - ['validate${capitalizedResourceName}Id']
 */
router.put("/update-${args[0]}/:id", validate${capitalizedResourceName}Id, update${capitalizedResourceName});


/**
 * @route DELETE /api/v1/${args[0]}/delete-${args[0]}/many
 * @description Delete multiple ${args[0]}
 * @access Public
 * @param {function} controller - ['deleteMany${capitalizedResourceName}']
 */
router.delete("/delete-${args[0]}/many", deleteMany${capitalizedResourceName});

/**
 * @route DELETE /api/v1/${args[0]}/delete-${args[0]}/:id
 * @description Delete a ${args[0]}
 * @param {string} id - The ID of the ${args[0]} to delete
 * @access Public
 * @param {function} controller - ['delete${capitalizedResourceName}']
 * @param {function} validation - ['validate${capitalizedResourceName}Id']
 */
router.delete("/delete-${args[0]}/:id", validate${capitalizedResourceName}Id, delete${capitalizedResourceName});

/**
 * @route GET /api/v1/${args[0]}/get-${args[0]}/many
 * @description Get multiple ${args[0]}
 * @access Public
 * @param {function} controller - ['getMany${capitalizedResourceName}']
 */
router.get("/get-${args[0]}/many", getMany${capitalizedResourceName});

/**
 * @route GET /api/v1/${args[0]}/get-${args[0]}/:id
 * @description Get a ${args[0]} by ID
 * @param {string} id - The ID of the ${args[0]} to retrieve
 * @access Public
 * @param {function} controller - ['get${capitalizedResourceName}ById']
 * @param {function} validation - ['validate${capitalizedResourceName}Id']
 */
router.get("/get-${args[0]}/:id", validate${capitalizedResourceName}Id, get${capitalizedResourceName}ById);

// Export the router
const ${capitalizedResourceName}Routes = router;
export default ${capitalizedResourceName}Routes;
    `;

      // Path to the route file
      const routeFilePath = path.join(routeDir, `${args[0]}.route.ts`);
      // Write content to the route file
      fs.writeFileSync(routeFilePath, routeContent.trim());

      // Create controller file content
      const controllerContent = `
import { Request, Response } from 'express';
import { ${resourceName}Services } from './${args[0]}.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

/**
 * Controller function to handle the creation of a single ${capitalizedResourceName}.
 *
 * @param {Request} req - The request object containing ${args[0]} data in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const create${capitalizedResourceName} = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new ${args[0]} and get the result
  const result = await ${resourceName}Services.create${capitalizedResourceName}(req.body);
  // Send a success response with the created resource data
    sendResponse(res, {
    message: 'New ${resourceName} Added Successfully',
    data: result,
  });
});

/**
 * Controller function to handle the creation of multiple ${args[0]}.
 *
 * @param {Request} req - The request object containing an array of ${args[0]} data in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const createMany${capitalizedResourceName} = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create multiple ${resourceName}s and get the result
  const result = await ${resourceName}Services.createMany${capitalizedResourceName}(req.body);
  // Send a success response with the created resources data
   sendResponse(res, {
    message: '${resourceName}s Created Successfully',
    data: result,
  });
});

/**
 * Controller function to handle the update operation for a single ${args[0]}.
 *
 * @param {Request} req - The request object containing the ID of the ${args[0]} to update in URL parameters and the updated data in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const update${capitalizedResourceName} = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to update the ${args[0]} by ID and get the result
  const result = await ${resourceName}Services.update${capitalizedResourceName}(id, req.body);
  // Send a success response with the updated resource data
 sendResponse(res, {
    message: '${resourceName} Updated Successfully',
    data: result,
  });
});

/**
 * Controller function to handle the update operation for multiple ${args[0]}.
 *
 * @param {Request} req - The request object containing an array of ${args[0]} data in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const updateMany${capitalizedResourceName} = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to update multiple ${args[0]} and get the result
  const result = await ${resourceName}Services.updateMany${capitalizedResourceName}(req.body);
  // Send a success response with the updated resources data
    sendResponse(res, {
    message: '${resourceName}s Updated Successfully',
    data: result,
  });
});

/**
 * Controller function to handle the deletion of a single ${args[0]}.
 *
 * @param {Request} req - The request object containing the ID of the ${args[0]} to delete in URL parameters.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const delete${capitalizedResourceName} = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to delete the ${args[0]} by ID
  await ${resourceName}Services.delete${capitalizedResourceName}(id);
  // Send a success response confirming the deletion
  sendResponse(res, {
    message: '${resourceName} Deleted Successfully',
    data: {},
  });
});

/**
 * Controller function to handle the deletion of multiple ${args[0]}.
 *
 * @param {Request} req - The request object containing an array of IDs of ${args[0]} to delete in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const deleteMany${capitalizedResourceName} = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to delete multiple ${args[0]} and get the result
  await ${resourceName}Services.deleteMany${capitalizedResourceName}(req.body);
  // Send a success response confirming the deletions
  sendResponse(res, {
    message: '${resourceName}s Deleted Successfully',
    data: {},
  });
});

/**
 * Controller function to handle the retrieval of a single ${args[0]} by ID.
 *
 * @param {Request} req - The request object containing the ID of the ${args[0]} to retrieve in URL parameters.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const get${capitalizedResourceName}ById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the ${args[0]} by ID and get the result
  const result = await ${resourceName}Services.get${capitalizedResourceName}ById(id);
  // Send a success response with the retrieved resource data
   sendResponse(res, {
    message: '${resourceName} Retrieved Successfully',
    data: result,
  });
});

/**
 * Controller function to handle the retrieval of multiple ${args[0]}.
 *
 * @param {Request} req - The request object containing query parameters for filtering.
 * @param {Response} res - The response object used to send the response.
 * @returns {void}
 */
export const getMany${capitalizedResourceName} = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple ${args[0]} based on query parameters and get the result
  const result = await ${resourceName}Services.getMany${capitalizedResourceName}(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: '${resourceName} Retrieved Successfully',
    data: result,
  });
});
    `;

      // Path to the controller file
      const controllerFilePath = path.join(controllerDir, `${args[0]}.controller.ts`);
      // Write content to the controller file
      fs.writeFileSync(controllerFilePath, controllerContent.trim());

      // Create model content
      const modelContent = `
import mongoose, { Schema } from 'mongoose';
import { T${capitalizedResourceName} } from './${resourceName}.interface';

// Define an interface representing a ${capitalizedResourceName} document

// Define the ${capitalizedResourceName} schema
const ${capitalizedResourceName}Schema: Schema<T${capitalizedResourceName}> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
});

// Create the ${capitalizedResourceName} model
const ${capitalizedResourceName} = mongoose.model<T${capitalizedResourceName}>('${capitalizedResourceName}', ${capitalizedResourceName}Schema);

// Export the ${capitalizedResourceName} model
export default ${capitalizedResourceName};
    `;

      // Path to the model file
      const modelFilePath = path.join(modelsDir, `${args[0]}.model.ts`);
      // Write content to the model file
      fs.writeFileSync(modelFilePath, modelContent.trim());

      // Create interface file content
      const interfaceContent = `
/**
 * Type definition for ${capitalizedResourceName}.
 *
 * This type defines the structure of a single ${resourceName} object.
 * @interface T${capitalizedResourceName}
 */
export interface T${capitalizedResourceName} {
  // Add fields as needed
}
    `;

      // Path to the interface file
      const interfaceFilePath = path.join(interfaceDir, `${args[0]}.interface.ts`);
      // Write content to the interface file
      fs.writeFileSync(interfaceFilePath, interfaceContent.trim());

      // Create Zod validation schema content
      const validationContent = `
import { NextFunction, Request, Response } from 'express';
import { isMongoId } from 'validator';
import { z } from 'zod';
import zodErrorHandler from '../../handlers/zod-error-handler';

/**
 * Zod schema for validating ${resourceName} data.
 */
const zod${capitalizedResourceName}Schema = z.object({
  id: z
    .string({
      required_error: "Id is required",
      invalid_type_error: "Please provide a valid id",
    })
    .refine((id: string) => isMongoId(id), {
      message: "Please provide a valid id",
    }),
  ids: z
    .array(z.string().refine((id: string) => isMongoId(id), {
      message: "Each ID must be a valid MongoDB ObjectId",
    }))
    .min(1, {
      message: "At least one ID must be provided",
    }),
}).strict();
    
/**
 * Middleware function to validate ${resourceName} ID using Zod schema.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {void}
 */
export const validate${capitalizedResourceName}Id = (req: Request, res: Response, next: NextFunction) => {
  // Validate request params
  const { error, success } = zod${capitalizedResourceName}Schema.pick({ id: true }).safeParse({ id: req.params.id });

  // Check if validation was successful
  if (!success) {
    // If validation failed, use the Zod error handler to send an error response
    return zodErrorHandler(req, res, error);
  }

  // If validation passed, proceed to the next middleware function
  return next();
};
    `;

      // Path to the zod validation file
      const validationFilePath = path.join(validationDir, `${args[0]}.validation.ts`);
      // Write content to the validation file
      fs.writeFileSync(validationFilePath, validationContent.trim());

      // Create service content
      const serviceContent = `
// Import the model
import ${capitalizedResourceName}Model from './${args[0]}.model'; 

/**
 * Service function to create a new ${resourceName}.
 *
 * @param data - The data to create a new ${resourceName}.
 * @returns {Promise<${capitalizedResourceName}>} - The created ${resourceName}.
 */
const create${capitalizedResourceName} = async (data: object) => {
  const new${capitalizedResourceName} = new ${capitalizedResourceName}Model(data);
  return await new${capitalizedResourceName}.save();
};

/**
 * Service function to create multiple ${resourceName}.
 *
 * @param data - An array of data to create multiple ${resourceName}.
 * @returns {Promise<${capitalizedResourceName}[]>} - The created ${resourceName}.
 */
const createMany${capitalizedResourceName} = async (data: object[]) => {
  return await ${capitalizedResourceName}Model.insertMany(data);
};

/**
 * Service function to update a single ${resourceName} by ID.
 *
 * @param id - The ID of the ${resourceName} to update.
 * @param data - The updated data for the ${resourceName}.
 * @returns {Promise<${capitalizedResourceName}>} - The updated ${resourceName}.
 */
const update${capitalizedResourceName} = async (id: string, data: object) => {
  return await ${capitalizedResourceName}Model.findByIdAndUpdate(id, data, { new: true });
};

/**
 * Service function to update multiple ${resourceName}.
 *
 * @param data - An array of data to update multiple ${resourceName}.
 * @returns {Promise<${capitalizedResourceName}[]>} - The updated ${resourceName}.
 */
const updateMany${capitalizedResourceName} = async (data: { id: string, updates: object }[]) => {
  const updatePromises = data.map(({ id, updates }) =>
    ${capitalizedResourceName}Model.findByIdAndUpdate(id, updates, { new: true })
  );
  return await Promise.all(updatePromises);
};

/**
 * Service function to delete a single ${resourceName} by ID.
 *
 * @param id - The ID of the ${resourceName} to delete.
 * @returns {Promise<${capitalizedResourceName}>} - The deleted ${resourceName}.
 */
const delete${capitalizedResourceName} = async (id: string) => {
  return await ${capitalizedResourceName}Model.findByIdAndDelete(id);
};

/**
 * Service function to delete multiple ${resourceName}.
 *
 * @param ids - An array of IDs of ${resourceName} to delete.
 * @returns {Promise<${capitalizedResourceName}[]>} - The deleted ${resourceName}.
 */
const deleteMany${capitalizedResourceName} = async (ids: string[]) => {
  return await ${capitalizedResourceName}Model.deleteMany({ _id: { $in: ids } });
};

/**
 * Service function to retrieve a single ${resourceName} by ID.
 *
 * @param id - The ID of the ${resourceName} to retrieve.
 * @returns {Promise<${capitalizedResourceName}>} - The retrieved ${resourceName}.
 */
const get${capitalizedResourceName}ById = async (id: string) => {
  return await ${capitalizedResourceName}Model.findById(id);
};

/**
 * Service function to retrieve multiple ${resourceName} based on query parameters.
 *
 * @param query - The query parameters for filtering ${resourceName}.
 * @returns {Promise<${capitalizedResourceName}[]>} - The retrieved ${resourceName}.
 */
const getMany${capitalizedResourceName} = async (query: object) => {
  return await ${capitalizedResourceName}Model.find(query);
};

export const ${resourceName}Services = {
  create${capitalizedResourceName},
  createMany${capitalizedResourceName},
  update${capitalizedResourceName},
  updateMany${capitalizedResourceName},
  delete${capitalizedResourceName},
  deleteMany${capitalizedResourceName},
  get${capitalizedResourceName}ById,
  getMany${capitalizedResourceName},
};

    `;
      // Path to the service file
      const serviceFilePath = path.join(serviceDir, `${args[0]}.service.ts`);
      // Write content to the service file
      fs.writeFileSync(serviceFilePath, serviceContent.trim());

      // Log the creation of the controller, interface, model , route, service & validation files
      console.log(
        `${GREEN}CREATE ${RESET}${formatPath(
          controllerFilePath
        )} ${BLUE}(${Buffer.byteLength(controllerContent, 'utf8')} bytes)`
      );
      console.log(
        `${GREEN}CREATE ${RESET}${formatPath(
          interfaceFilePath
        )} ${BLUE}(${Buffer.byteLength(interfaceContent, 'utf8')} bytes)`
      );
      console.log(
        `${GREEN}CREATE ${RESET}${formatPath(
          modelFilePath
        )} ${BLUE}(${Buffer.byteLength(modelContent, 'utf8')} bytes)`
      );
      console.log(
        `${GREEN}CREATE ${RESET}${formatPath(
          routeFilePath
        )} ${BLUE}(${Buffer.byteLength(routeContent, 'utf8')} bytes)`
      );
      console.log(
        `${GREEN}CREATE ${RESET}${formatPath(
          serviceFilePath
        )} ${BLUE}(${Buffer.byteLength(serviceContent, 'utf8')} bytes)`
      );
      console.log(
        `${GREEN}CREATE ${RESET}${formatPath(
          validationFilePath
        )} ${BLUE}(${Buffer.byteLength(validationContent, 'utf8')} bytes)`
      );
    });

  program.parse(process.argv);
} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
