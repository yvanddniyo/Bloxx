import { Module } from "@nestjs/common";
import { cloudinaryService } from "./cloudinaryService";

@Module({
  providers: [cloudinaryService],
  exports: [cloudinaryService]
})

export class CloudinaryModule {}