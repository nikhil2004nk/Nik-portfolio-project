import { Injectable } from '@nestjs/common';

@Injectable()
export class ExperienceMapper {
  toPublicResponse(experience: any) {
    if (!experience) return null;
    return {
      id: experience.id,
      company: experience.company,
      position: experience.position,
      location: experience.location,
      startDate: experience.startDate,
      endDate: experience.endDate,
      current: experience.current,
      description: experience.description,
      employmentType: experience.employmentType,
      achievements: experience.achievements?.map((a: any) => a.description) || [],
    };
  }

  toPublicListResponse(experiences: any[]) {
    return experiences.map(e => this.toPublicResponse(e));
  }
}
