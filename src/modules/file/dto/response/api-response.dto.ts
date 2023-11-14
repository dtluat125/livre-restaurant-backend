import { ApiResponse } from 'src/common/helpers/api.response';
import { FileResponseDto } from './file-response.dto';

export class FileDetailResult extends ApiResponse<FileResponseDto> {
    data: FileResponseDto;
}
