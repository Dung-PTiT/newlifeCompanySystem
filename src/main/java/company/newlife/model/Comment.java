package company.newlife.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
public class Comment {
    private Integer id;
    private String commentBy;
    private String content;
    private String createdDate;
    private List<Comment> childComments;
    private boolean isAccepted;
    private boolean isRemoved;
    private Integer postId;
    private Integer parentCommentId;

    public Comment() {
        this.isAccepted = false;
        this.isRemoved = false;
    }
}
