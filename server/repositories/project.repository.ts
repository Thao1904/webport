import { Project, IProjectModel } from "../models/Project";
import "../models/Category";

export class ProjectRepository {
  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    Project.find()
      .select("title categories is_publish is_private slug viewed updatedAt")
      .sort({ createdAt: -1 })
      .populate("categories", "name")
      .skip(skip)
      .limit(limit),

    Project.countDocuments()
  ]);

  return {
    projects,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1
    }
  };
  }

  async findById(id: string) {
    return Project.findById(id);
  }

  async findBySlug(slug: string) {
    return Project.find({ slug: slug }).populate("categories", "name");
  }

  async create(data: IProjectModel) {
    return Project.create(data);
  }

  async update(id: string, data: Partial<IProjectModel>) {
    return Project.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return Project.findByIdAndDelete(id);
  }
}
