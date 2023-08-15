import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({ where: { userId } });
  }

  getBookmarksById(userId: number, bookmarkId: number) {
    return this.prisma.bookmark.findFirst({ where: { userId } });
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });
    return bookmark;
  }

  async editBookmarksById(
    userId: number,
    dto: EditBookmarkDto,
    bookmarkId: number,
  ) {
    //get the bookmark by id
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });

    //check if user owns th book
    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    //update the bookmark
    return await this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmarksById(userId: number, bookmarkId: number) {
    //get the bookmark by id
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });

    //check if user owns th book
    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    //update the bookmark
    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
