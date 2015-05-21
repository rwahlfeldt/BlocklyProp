/**
 * This class is generated by jOOQ
 */
package eu.creatingfuture.propeller.blocklyprop.db.generated;


import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.Project;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.ProjectTag;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.Tag;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.User;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.ProjectRecord;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.ProjectTagRecord;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.TagRecord;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.UserRecord;

import javax.annotation.Generated;

import org.jooq.ForeignKey;
import org.jooq.Identity;
import org.jooq.UniqueKey;
import org.jooq.impl.AbstractKeys;


/**
 * A class modelling foreign key relationships between tables of the <code>blocklyprop</code> 
 * schema
 */
@Generated(
	value = {
		"http://www.jooq.org",
		"jOOQ version:3.6.1"
	},
	comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Keys {

	// -------------------------------------------------------------------------
	// IDENTITY definitions
	// -------------------------------------------------------------------------

	public static final Identity<TagRecord, Integer> IDENTITY_TAG = Identities0.IDENTITY_TAG;

	// -------------------------------------------------------------------------
	// UNIQUE and PRIMARY KEY definitions
	// -------------------------------------------------------------------------

	public static final UniqueKey<ProjectRecord> KEY_PROJECT_PRIMARY = UniqueKeys0.KEY_PROJECT_PRIMARY;
	public static final UniqueKey<TagRecord> KEY_TAG_PRIMARY = UniqueKeys0.KEY_TAG_PRIMARY;
	public static final UniqueKey<TagRecord> KEY_TAG_NAME_UNIQUE = UniqueKeys0.KEY_TAG_NAME_UNIQUE;
	public static final UniqueKey<UserRecord> KEY_USER_PRIMARY = UniqueKeys0.KEY_USER_PRIMARY;
	public static final UniqueKey<UserRecord> KEY_USER_SCREENNAME_UNIQUE = UniqueKeys0.KEY_USER_SCREENNAME_UNIQUE;
	public static final UniqueKey<UserRecord> KEY_USER_EMAIL_UNIQUE = UniqueKeys0.KEY_USER_EMAIL_UNIQUE;

	// -------------------------------------------------------------------------
	// FOREIGN KEY definitions
	// -------------------------------------------------------------------------

	public static final ForeignKey<ProjectRecord, UserRecord> PROJECT_USER = ForeignKeys0.PROJECT_USER;
	public static final ForeignKey<ProjectTagRecord, ProjectRecord> PROJECT_TAG_PROJECT = ForeignKeys0.PROJECT_TAG_PROJECT;
	public static final ForeignKey<ProjectTagRecord, TagRecord> PROJECT_TAG_TAG = ForeignKeys0.PROJECT_TAG_TAG;

	// -------------------------------------------------------------------------
	// [#1459] distribute members to avoid static initialisers > 64kb
	// -------------------------------------------------------------------------

	private static class Identities0 extends AbstractKeys {
		public static Identity<TagRecord, Integer> IDENTITY_TAG = createIdentity(Tag.TAG, Tag.TAG.ID);
	}

	private static class UniqueKeys0 extends AbstractKeys {
		public static final UniqueKey<ProjectRecord> KEY_PROJECT_PRIMARY = createUniqueKey(Project.PROJECT, Project.PROJECT.ID);
		public static final UniqueKey<TagRecord> KEY_TAG_PRIMARY = createUniqueKey(Tag.TAG, Tag.TAG.ID);
		public static final UniqueKey<TagRecord> KEY_TAG_NAME_UNIQUE = createUniqueKey(Tag.TAG, Tag.TAG.NAME);
		public static final UniqueKey<UserRecord> KEY_USER_PRIMARY = createUniqueKey(User.USER, User.USER.ID);
		public static final UniqueKey<UserRecord> KEY_USER_SCREENNAME_UNIQUE = createUniqueKey(User.USER, User.USER.SCREENNAME);
		public static final UniqueKey<UserRecord> KEY_USER_EMAIL_UNIQUE = createUniqueKey(User.USER, User.USER.EMAIL);
	}

	private static class ForeignKeys0 extends AbstractKeys {
		public static final ForeignKey<ProjectRecord, UserRecord> PROJECT_USER = createForeignKey(eu.creatingfuture.propeller.blocklyprop.db.generated.Keys.KEY_USER_PRIMARY, Project.PROJECT, Project.PROJECT.ID_USER);
		public static final ForeignKey<ProjectTagRecord, ProjectRecord> PROJECT_TAG_PROJECT = createForeignKey(eu.creatingfuture.propeller.blocklyprop.db.generated.Keys.KEY_PROJECT_PRIMARY, ProjectTag.PROJECT_TAG, ProjectTag.PROJECT_TAG.ID_PROJECT);
		public static final ForeignKey<ProjectTagRecord, TagRecord> PROJECT_TAG_TAG = createForeignKey(eu.creatingfuture.propeller.blocklyprop.db.generated.Keys.KEY_TAG_PRIMARY, ProjectTag.PROJECT_TAG, ProjectTag.PROJECT_TAG.ID_TAG);
	}
}
