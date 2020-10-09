package company.newlife.model;

import org.springframework.web.multipart.MultipartFile;


public class UploadForm {
    private MultipartFile file;
    private Integer postId;

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }
}
