package company.newlife.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Post {
    private Integer id;
    private String code;
    private String title;
    private String description;
    private String content;
    private Boolean active;
    private Boolean commentBlocked;
    private String createdDate;
    private String lastModifiedDate;
//    private String authorCode;
//    private String authorName;
    private Set<Tag> tags;
    private List<Comment> comments;
    private Set<Category> categories;
}
