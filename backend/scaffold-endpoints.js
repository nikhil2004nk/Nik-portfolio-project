const fs = require('fs');
const path = require('path');

const modules = ['projects', 'skills', 'experience', 'education', 'certifications'];

modules.forEach(mod => {
  const modName = mod.charAt(0).toUpperCase() + mod.slice(1);
  const modSingle = mod.endsWith('s') ? mod.slice(0, -1) : mod;
  
  // Service
  const servicePath = path.join(__dirname, 'src', 'modules', mod, `${mod}.service.ts`);
  const serviceCode = `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ${modName}Service {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.${modSingle}.findMany({
      orderBy: ${mod === 'projects' ? '{ order: "asc" }' : mod === 'experience' ? '{ startDate: "desc" }' : mod === 'education' ? '{ year: "desc" }' : '{ createdAt: "desc" }'}
    });
  }
}
`;
  fs.writeFileSync(servicePath, serviceCode);

  // Controller
  const controllerPath = path.join(__dirname, 'src', 'modules', mod, `${mod}.controller.ts`);
  const controllerCode = `import { Controller, Get } from '@nestjs/common';
import { ${modName}Service } from './${mod}.service';

@Controller('${mod}')
export class ${modName}Controller {
  constructor(private readonly ${mod}Service: ${modName}Service) {}

  @Get()
  findAll() {
    return this.${mod}Service.findAll();
  }
}
`;
  fs.writeFileSync(controllerPath, controllerCode);
});

// Health Controller
const healthControllerPath = path.join(__dirname, 'src', 'modules', 'health', 'health.controller.ts');
const healthControllerCode = `import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
`;
fs.writeFileSync(healthControllerPath, healthControllerCode);

console.log('Endpoints scaffolded successfully.');
