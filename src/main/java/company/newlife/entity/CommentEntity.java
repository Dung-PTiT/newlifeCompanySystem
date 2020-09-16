package company.newlife.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "comment")
@EntityListeners(value = AuditingEntityListener.class)
public class CommentEntity {

    @Id
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "comment_by", nullable = false, length = 64)
    private String commentBy;

    @Column(name = "content", nullable = false, columnDefinition = "text")
    private String content;

    @CreatedDate
    @Temporal(value = TemporalType.TIMESTAMP)
    @Column(name = "created_date", nullable = false)
    private Date createdDate;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "parentComment")
    private List<CommentEntity> childComments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_comment_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_comment_comment"))
    private CommentEntity parentComment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_comment_post"))
    private PostEntity post;

    @Column(name = "is_accepted", nullable = false)
    private boolean isAccepted;

    @Column(name = "is_removed", nullable = false)
    private boolean isRemoved;

    public CommentEntity() {
        this.isAccepted = false;
        this.isRemoved = false;
    }
}
